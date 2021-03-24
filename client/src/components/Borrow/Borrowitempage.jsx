import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col } from "reactstrap";

import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
// import {  } from "../../actions/itemActions";
import { withRouter} from "react-router-dom";
import { useSelector } from 'react-redux';
import ownerImage from "../../img/owner.png";


function Borrowitempage(props) {
    // console.log('starting hereee');
    console.log(props.location.state.currentItem);    
    const currentItem = props.location.state.currentItem;
    console.log(currentItem);
    const eee = useSelector(state => state);
    console.log(eee);
    const userId = eee.auth.user.id;
    const [owner, setOwner] = useState({name:"",email:"",phoneNumber:0,roomNumber:0,hostelName:""});
    useEffect(() => {
      async function fetchData() {
          try{
              const response = await axios.get("http://localhost:5000/api/users/getOwner/"+props.location.state.currentItem.owner);
              console.log("HELLO");
              setOwner(response.data);
              console.log(response.data);
          } 
          catch(e){
              console.log(e);
          }   
        } 
        fetchData();
    
    },[props]);
    const onBorrowClick = async (item) => {
      console.log(item);
      // Borrower wants an item- clicks borrow-> 1)request user id gets appended to that item. 2) item ID gets appended to borrower's requested items.

      const response  = await axios.post("http://localhost:5000/api/items/requestItem/"+eee.auth.user.id, { id: item._id });
      console.log(response);
      // window.location.reload(); 
      // props.history.push("/borrowpage/");
    };

    // TODO: query currentItem.owner details
  return (
  <div style={{backgroundColor:"#e8ffff"}}>
     <div className="container center" style={{width: "100%"}}>
       
          <Card style={{ height: "30rem", width: "18rem", display: "inline-block", backgroundColor:"#e8ffff", margin: 10}}>
            <CardBody>
              <CardTitle
                style={{
                  fontFamily: "Open Sans, Arial, sans-serif",
                  padding: "10px 20px 0px 20px",
                }}
                tag="h5"
              >
                {currentItem.name}
              </CardTitle>
              <CardImg  height="300" width="250" src={currentItem.image}/>
              <CardText
                style={{
                  fontFamily: "Open Sans, Arial, sans-serif",
                  padding: "0px 20px 10px 20px",
                }}
              >
                Rs. {currentItem.price}
              </CardText>
              <Button
                style={{ width: "100%" }}
                onClick={() => onBorrowClick(currentItem) } 
                className="btn  waves-light hoverable accent-3"
              >
                Borrow
              </Button>
            </CardBody>
          </Card>
          <Card style={{ height: "30rem", width: "18rem", display: "inline-block", backgroundColor:"#e8ffff", margin: 10}}>
            <CardBody>
              <CardTitle
                style={{
                  fontFamily: "Open Sans, Arial, sans-serif",
                  padding: "10px 20px 0px 20px",
                }}
                tag="h5"
              >
                {owner.name}
              </CardTitle>
              <CardImg  height="250" width="200" src={ownerImage}/>
              <CardText
                style={{
                  fontFamily: "Open Sans, Arial, sans-serif",
                  padding: "0px 20px 10px 20px",
                }}
              >
                {owner.email} <br/>
                {owner.phoneNumber}
              </CardText>
              <Button
                style={{ width: "100%" }}
                // onClick={() => } 
                className="btn  waves-light hoverable accent-3"
              >
                Contact Owner
              </Button>
            </CardBody>
          </Card>
    </div>
  </div>
  );
}

// export default Lendpage;



const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { }
)(withRouter(Borrowitempage));

