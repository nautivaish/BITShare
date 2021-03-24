import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { deleteItem } from "../../actions/itemActions";
import { withRouter } from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from "../layout/Navbar";
import ItemCard from "./ItemCard";
  
export default  function MyFavouriteItems() {
    const [favouriteItemList, setFavouriteItemList] = useState([]);
    const eee = useSelector(state => state);
      console.log(eee);
      useEffect(() => {
          async function fetchData() { 
            const response = await axios.get("http://localhost:5000/api/items/fetchFavouriteItems/"+eee.auth.user.id);
            setFavouriteItemList(response.data);
            console.log("pay attention");
            console.log(response);
          } 
        fetchData();
      }, []);
  
    const onBorrowItemClick = () => {
        // complete this function
    };
  
  
    return (
    <div style={{backgroundColor:"#e8ffff"}}>
      <Navbar />
       <div className="container center" style={{width: "100%"}}>
        <br></br>
        {favouriteItemList.map((item, index) => (<ItemCard item={item} key={index.toString()} img={item.image} name={item.name} price={item.price} />))}
      </div> 
    </div>
    );
  }
  
 