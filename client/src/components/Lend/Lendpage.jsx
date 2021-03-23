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

function Lendpage(props) {
  const [itemList, setItemList] = useState([]);
  const eee = useSelector(state => state);
    console.log(eee);
    useEffect(() => {
    
    async function fetchData() { 
      const response = await axios.get("http://localhost:5000/api/items/getItems/"+eee.auth.user.id);
    setItemList(response.data);
    } 
    fetchData();
    
  }, []);

  const onAddItemClick = e => {
    props.history.push("/additem");
  };
  const onDeleteItemClick = async (item) => {
    console.log(item);
    const response  = await axios.post("http://localhost:5000/api/items/deleteItem/"+eee.auth.user.id, { id: item._id });
    console.log(response);
    window.location.reload(); 
    props.history.push("/lendpage");
  };
  

  
    
  return (
  <div style={{backgroundColor:"#e8ffff"}}>
    <Navbar />
     <div className="container center" style={{width: "100%"}}>
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          margin: "2rem",
          backgroundColor: "#0278ae"
        }}
        onClick={onAddItemClick}
        className="btn btn-large waves-effect waves-light hoverable accent-3"
      >
        Add Item
      </button>
      <br></br>
      {itemList.map((item, index) => (<ItemCard item={item} key={index.toString()} img={item.image} name={item.name} price={item.price} onDeleteItemClick={onDeleteItemClick}/>))}
      {/* <Row>
        {itemList.map((item, index) => (
          <Col>
            <ul key ={index.toString()}>
            
          <Card style={{ height: "30rem", width: "18rem", display: "inline-block", backgroundColor:"#e8ffff", margin: 10}}>
            <CardBody>
              <CardTitle
                style={{
                  fontFamily: "Open Sans, Arial, sans-serif",
                  padding: "10px 20px 0px 20px",
                }}
                tag="h5"
              >
                {item.name}
              </CardTitle>
              <CardImg  height="300" width="250" src={item.image}/>
              <CardText
                style={{
                  fontFamily: "Open Sans, Arial, sans-serif",
                  padding: "0px 20px 10px 20px",
                }}
              >
                Rs. {item.price}
              </CardText>
              <Button
                style={{ width: "100%" }}
                onClick={() => onDeleteItemClick(item)}
                className="btn  waves-light hoverable accent-3"
              >
                Delete
              </Button>
            </CardBody>
          </Card>
          </ul>
          </Col>
          
        ))}
      </Row> */}

    </div>
  </div>
  );
}

// export default Lendpage;

Lendpage.propTypes = {
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteItem }
)(withRouter(Lendpage));


// {itemList.map((item, index) => (<ul key ={index.toString()}> 
//         {item.name} {item.price}
//         </ul>))}
