import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from "reactstrap";
  
  import React, { Component, useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import PropTypes from "prop-types";
  import { connect } from "react-redux";
  import axios from "axios";
  import { deleteItem } from "../../actions/itemActions";
  import { withRouter } from "react-router-dom";
  import { useSelector } from 'react-redux';
  import Navbar from "../layout/Navbar";
  import ItemCard from "./ItemCard2";
  
  
  function PreviousItems(props){
    const [itemList, setItemList] = useState([]);
    // const requestArray [item name, image of dimension 10*10, requestor name ]
    const eee = useSelector(state => state);
      console.log(eee);
      useEffect(() => {
      
      async function fetchData() { 
        const response = await axios.get("http://localhost:5000/api/items/previousItems/"+eee.auth.user.id);
        setItemList(response.data.previouslyBorrowedItems);
        console.log(response.data.requestedItems);
      } 
      fetchData();
      
    }, []);
    const onCheckItemClick = (item) => {
        console.log(item);
        const pathwithid = "/borrowpage/" + item._id;
        props.history.push({
          pathname: pathwithid,
          state: { currentItem: item }
        });
      };  
  
    
      
    return (
    <div style={{backgroundColor:""}}>
      <Navbar props2={props}/>
      <h3 className="center">Previously Borrowed Items</h3>
       <div className="container center" style={{width: "100%"}}>
        { 
        <Row>
          {itemList.map((item, index) => (
            <ItemCard item={item} key={index.toString()} img={item.image} name={item.name} price={item.price} Function={() => onCheckItemClick(item)} buttonname="Check Item" />            
          ))}
        </Row> }
  
        
      </div>
    </div>
    );
  }
  
  // export default PreviousItems;
  

  const mapStateToProps = state => ({
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
  )(withRouter(PreviousItems));


  // <Col>
  //             <ul key ={index.toString()}>
              
  //           <Card style={{ height: "30rem", width: "18rem", display: "inline-block", backgroundColor:"", margin: 10}}>
  //             <CardBody>
  //               <CardTitle
  //                 style={{
  //                   fontFamily: "Open Sans, Arial, sans-serif",
  //                   padding: "10px 20px 0px 20px",
  //                 }}
  //                 tag="h5"
  //               >
  //                 {item.name}
  //               </CardTitle>
  //               <CardImg  height="300" width="250" src={item.image}/>
  //               <CardText
  //                 style={{
  //                   fontFamily: "Open Sans, Arial, sans-serif",
  //                   padding: "0px 20px 10px 20px",
  //                 }}
  //               >
  //                 Rs. {item.price}
  //               </CardText>
                
  //               <Button
  //                 style={{ width: "100%" }}
  //                 onClick={() => onCheckItemClick(item)}
  //                 className="btn  waves-light hoverable accent-3">
  //                 Check Item
  //               </Button>               
  //             </CardBody>
  //           </Card>
  //           </ul>
  //           </Col>
  
  