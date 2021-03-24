import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from "reactstrap";
  
  import React, { Component, useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import PropTypes from "prop-types";
  import { connect } from "react-redux";
  import axios from "axios";
  import { withRouter} from "react-router-dom";
  import { useSelector } from 'react-redux';
  import Navbar from "../layout/Navbar";
  import ItemCard from "./ItemCard";
  
  
  function RequestedItems(props){
    const [itemList, setItemList] = useState([]);
    // const requestArray [item name, image of dimension 10*10, requestor name ]
    const eee = useSelector(state => state);
      console.log(eee);
      useEffect(() => {
      
      async function fetchData() { 
        const response = await axios.get("http://localhost:5000/api/items/borrowedItems/"+eee.auth.user.id);
        setItemList(response.data.currentlyBorrowedItems);
      } 
      fetchData();
      
    }, []);
  
    return (
    <div style={{backgroundColor:"#e8ffff"}}>
      <Navbar />
       <div className="container center" style={{width: "100%"}}>
        { 
        <Row>
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
                              
              </CardBody>
            </Card>
            </ul>
            </Col>
            
          ))}
        </Row> }
  
        
      </div>
    </div>
    );
  }
  
  // export default RequestedItems;
  

  const mapStateToProps = state => ({
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
  )(withRouter(RequestedItems));
  
  