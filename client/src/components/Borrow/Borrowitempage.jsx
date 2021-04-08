import { Card, CardImg, CardText, CardBody, CardGroup,
  CardTitle, CardSubtitle, Button, Container, Row, Col, CardDeck} from "reactstrap";

import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
// import {  } from "../../actions/itemActions";
import { withRouter} from "react-router-dom";
import { useSelector } from 'react-redux';
import ownerImage from "../../img/owner.png";
import Navbar from "../layout/Navbar";

function Borrowitempage(props) {  
    const currentItem = props.location.state.currentItem;
    const eee = useSelector(state => state);
    const userId = eee.auth.user.id;
    const [owner, setOwner] = useState({name:"",email:"",phoneNumber:0,roomNumber:0,hostelName:""});
    useEffect(() => {
      async function fetchData() {
          try{
              const response = await axios.get("http://localhost:5000/api/users/getOwner/"+props.location.state.currentItem.owner);
              console.log("HELLO");
              setOwner(response.data);
              console.log(response.data);
              console.log(currentItem.tags);
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
      props.history.push("/borrowpage/");
    };


    
    // TODO: query currentItem.owner details
  // return (
  // <div style={{backgroundColor:""}}>
  // <Navbar props2={props}/>
  //    <div className="container center" style={{width: "100%"}}>
  //    {/* <div class="row"> */}
  //    {/* <div className="d-flex bd-highlight example-parent">
  //    <div className="p-2 flex-fill bd-highlight row-example"> */}
  //         <Card style={{ height: "30rem", width: "18rem", display: "inline-block", backgroundColor:"", margin: 10}}>
  //           <CardBody>
  //             <CardTitle
  //               style={{
  //                 fontFamily: "Open Sans, Arial, sans-serif",
  //                 padding: "10px 20px 0px 20px",
  //               }}
  //               tag="h6"
  //             >
  //               {currentItem.name}
  //             </CardTitle>
  //             <CardImg  height="300" width="250" src={currentItem.image}/>
  //             <CardText
  //               style={{
  //                 fontFamily: "Open Sans, Arial, sans-serif",
  //                 padding: "0px 20px 10px 20px",
  //               }}
  //             >
  //               Rs. {currentItem.price}
  //             </CardText>
  //              <Button
  //               style={{ width: "100%" }}
  //               onClick={() => onBorrowClick(currentItem) } 
  //               className="btn  waves-light hoverable accent-3"
  //             >
  //               Borrow
  //             </Button> 
  //           </CardBody>
  //         </Card>
          
  //         <Card margin-top = "10" style={{ height: "30rem", width: "18rem", display: "inline-block", backgroundColor:"", margin: 20}}>
  //           <CardBody>
  //             <CardTitle
  //               style={{
  //                 fontFamily: "Open Sans, Arial, sans-serif",
  //                 padding: "10px 20px 0px 20px",
  //               }}
  //               tag="h6"
  //             >{owner.name}
  //             </CardTitle>
  //             <CardImg  height="300" width="250" src={ownerImage}/>
  //             <CardText
  //               style={{
  //                 fontFamily: "Open Sans, Arial, sans-serif",
  //                 padding: "0px 20px 10px 20px",
  //               }}
  //             >
  //               {owner.email} <br/>
  //               {owner.phoneNumber}
  //             </CardText>
  //              <Button 
  //               style={{ width: "100%" }}
  //               // onClick={() => } 
  //               className="btn  waves-light hoverable accent-3"
  //             >
  //               Contact Owner
  //             </Button> 
  //           </CardBody>
  //         </Card>
  //   </div>
  // </div>
  // );
  return (
    <div className="row">
      <Navbar props2={props}/>
      <div className="col s5"><img src={currentItem.image} alt="Login Image" width="100%" height="auto" style={{padding:"4rem"}}/></div>
      <div className="col s7" style={{padding:"1rem 5rem 0 5rem"}} > 
        <h3><b>{currentItem.name}</b></h3>
        <p style={{fontSize: "1.15rem"}}><b>Price:</b> Rs. {currentItem.price}</p>
        {currentItem.tags.length>0 && <p style={{fontSize: "1.15rem"}}><b>Tags:</b> {currentItem.tags.join(', ')}</p>}
        <hr/>
        <div style={{fontSize: "1.15rem"}}>
        <h5><b>Owner details: </b></h5>
        <p><b>Name:</b> {owner.name}</p>
        <p><b>Phone No.:</b> {owner.phoneNumber}</p>
        <p><b>Hostel:</b> {owner.hostelName}</p>
        <p><b>Room no.:</b> {owner.roomNumber}</p>
        <p><b>Email:</b> {owner.email}</p>
        </div>
        <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          margin: "2rem",
          // backgroundColor: "#0278ae"
          backgroundColor: "#3f51b5"
        }}
        onClick={() => onBorrowClick(currentItem)}
        className="btn btn-large waves-effect waves-light hoverable accent-3"
      >
        Borrow Item
      </button>
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

