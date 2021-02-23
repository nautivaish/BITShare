import axios from "axios";
import {
  GET_ERRORS,
} from "./types";
// Register User
export const registerItem = (itemData) => dispatch => {
  axios
    .post("http://localhost:5000/api/items/postItem", itemData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete item 
export const deleteItem = () => dispatch => {
  
};