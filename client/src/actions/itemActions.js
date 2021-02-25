import axios from "axios";
import {
  GET_ERRORS,
} from "./types";

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

export const deleteItem = (itemData) => dispatch => {
  axios
    .post("http://localhost:5000/api/items/deleteItem", itemData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
