import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from "reactstrap";
  
  import React, { Component, useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import PropTypes from "prop-types";
  import { connect } from "react-redux";
  import axios from "axios";
  import { deleteItem } from "../../actions/itemActions";
  import { withRouter} from "react-router-dom";
  import { useSelector } from 'react-redux';
  import Navbar from "../layout/Navbar";
  import ItemCard from "./ItemCard";
import { response } from "express";
  
  function MyFavouriteItems(props) {
    const [favouriteItemList, setFavouriteItemList] = useState([]);
    const eee = useSelector(state => state);
      console.log(eee);
      useEffect(() => {
          async function fetchData() { 
            const response2 = await axios.get("http://localhost:5000/api/items/fetchFavouriteItems/"+eee.auth.user.id);
            setFavouriteItemList(response2.data);
            console.log("pay attention");
            console.log(response2);
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
  
  // export default Lendpage;
  
  MyFavouriteItems.propTypes = {
    // deleteItem: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps
  )(withRouter(MyFavouriteItems));
  
  