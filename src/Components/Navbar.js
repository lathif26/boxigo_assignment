import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./Navbar.css";
import { FaTruckArrowRight } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const Navbar = () => {
  const [activeKey, setActiveKey] = useState("/");

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  return (
    <Nav
      className="col-md-12 d-none d-md-block bg-light sidebar"
      activeKey={activeKey}
      onSelect={handleSelect}
      style={{ height: "100vh", position: "fixed", width: "200px" }}
    >
      <div className="sidebar-sticky"></div>
      <Nav.Item>
        <div
          className={`nav-item ${activeKey === "/" ? "active" : ""}`}
          onClick={() => handleSelect("/")}
        >
          <FaTruckArrowRight className="nav-icon" />
          <Nav.Link eventKey="/" className="nav-link">
            MY MOVES
          </Nav.Link>
        </div>
      </Nav.Item>
      <Nav.Item>
        <div
          className={`nav-item ${activeKey === "/profile" ? "active" : ""}`}
          onClick={() => handleSelect("/profile")}
        >
          <FaUser className="nav-icon" />
          <Nav.Link eventKey="/profile" className="nav-link">
            MY PROFILE
          </Nav.Link>
        </div>
      </Nav.Item>
      <Nav.Item>
        <div
          className={`nav-item ${activeKey === "/quote" ? "active" : ""}`}
          onClick={() => handleSelect("/quote")}
        >
          <FaMoneyBillTrendUp className="nav-icon" />
          <Nav.Link eventKey="/quote" className="nav-link">
            GET QUOTE
          </Nav.Link>
        </div>
      </Nav.Item>
      <Nav.Item>
        <div
          className={`nav-item ${activeKey === "/logout" ? "active" : ""}`}
          onClick={() => handleSelect("/logout")}
        >
          <BsArrowLeftCircleFill className="nav-icon" />
          <Nav.Link eventKey="/logout" className="nav-link">
            LOGOUT
          </Nav.Link>
        </div>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
