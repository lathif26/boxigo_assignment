import axios from "axios";

export const fetchItems = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_ITEMS_REQUEST" });
    try {
      const response = await axios.get(
        "http://test.api.boxigo.in/sample-data/"
      );
      const items = response.data.Customer_Estimate_Flow;
      dispatch({ type: "FETCH_ITEMS_SUCCESS", payload: items });
    } catch (error) {
      dispatch({ type: "FETCH_ITEMS_FAILURE", payload: error.message });
    }
  };
};
