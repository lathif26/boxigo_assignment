import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/itemsAction";
import "./ItemsList.css";
import { BsArrowRightCircle } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { format } from "date-fns";
import { PiBuildingsFill } from "react-icons/pi";
import { GiPathDistance } from "react-icons/gi";
import { BiSolidCalendar } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";

const ItemsList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const loading = useSelector((state) => state.items.loading);
  const error = useSelector((state) => state.items.error);
  const [expandedItems, setExpandedItems] = useState({});
  const [expandedInventory, setExpandedInventory] = useState({});

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const toggleDetails = (id) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const toggleInventory = (itemId, inventoryId) => {
    setExpandedInventory((prevState) => ({
      ...prevState,
      [itemId]: {
        ...prevState[itemId],
        [inventoryId]: !prevState[itemId]?.[inventoryId],
      },
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="items-list">
      <h5 className="header">My Moves</h5>
      <ul>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <li key={item.estimate_id} className="item">
              <div className="item-header">
                <strong>From</strong>
                <strong className="strong_to">To</strong>
                <strong>Request#</strong>
              </div>
              <div className="item-details">
                <span className="item-from">{item.moving_from}</span>
                <BsArrowRightCircle className="arrow-icon" />
                <span className="item-to">{item.moving_to}</span>
                <span className="item-id">
                  <strong>{item.estimate_id}</strong>
                </span>
              </div>
              <div className="item-meta">
                <span className="icons_clr">
                <IoMdHome />{item.property_size}</span>
                 <span className="icons_clr"> <PiBuildingsFill />{item.total_items}</span>
                 <span className="icons_clr"> <GiPathDistance />{item.distance}</span>
                 <span className="icons_clr"> <BiSolidCalendar />{format(new Date(item.moving_on), "MMM dd, yyyy 'at' h a")}
                </span>
                <div>
                <span><button className='btn-move'onClick={() => toggleDetails(item.estimate_id)}>
                  View Move Details
                </button></span>
               <span></span> <button className='btn-quotes'>Quotes Awaiting</button>
                </div>
                
              </div>
              {expandedItems[item.estimate_id] && (
                <div className="item-details-dropdown">
                  <div>
                    <strong>Inventory Details</strong>
                    <ul>
                      {item.items.inventory.map((inventory, index) => (
                        <li key={index}>
                          {inventory.displayName}{" "}
                          <strong>{inventory.category.length}</strong>
                          <button
                            onClick={() =>
                              toggleInventory(item.estimate_id, index)
                            }
                          >
                            {expandedInventory[item.estimate_id]?.[index]
                              ? "Hide"
                              : "Show"}{" "}
                            Details
                          </button>
                          {expandedInventory[item.estimate_id]?.[index] && (
                            <div className="inventory-details">
                              {inventory.category.map((cat, catIndex) => (
                                <div key={catIndex}>
                                  <strong>{cat.name}</strong> {cat.count}
                                </div>
                              ))}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="item-detail-row">
                    <strong>Existing House Details</strong>
                    <span>
                      <strong>Floor No</strong> {item.old_floor_no}
                    </span>
                    <span>
                      <strong>Elevator Available</strong>{" "}
                      {item.old_elevator_availability}
                    </span>
                    <span>
                      <strong>Packing Required</strong> {item.packing_service}
                    </span>
                    <span>
                      <strong>Additional Information</strong>{" "}
                      {item.old_house_additional_info}
                    </span>
                  </div>
                  <div className="item-detail-row">
                    <strong>New House Details</strong>
                    <span>
                      <strong>Floor No</strong> {item.new_floor_no}
                    </span>
                    <span>
                      <strong>Elevator Available</strong>{" "}
                      {item.new_elevator_availability}
                    </span>
                    <span>
                      <strong>Packing Required</strong> {item.packing_service}
                    </span>
                    <span>
                      <strong>Additional Information</strong>{" "}
                      {item.new_house_additional_info}
                    </span>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No items found</p>
        )}
      </ul>
    </div>
  );
};

export default ItemsList;
