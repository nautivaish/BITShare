import { checkItem } from "../../actions/itemActions";
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

function CheckItem(props){
    const [item, setItem] = useState({name:"",price:0,image:"",owner:{name:"",phoneNumber:0}});
    useEffect(() => {
      async function fetchData() {
        try{

            const response = await axios.get("http://localhost:5000/api/items/checkItem/"+props.match.params.id);
        setItem(response.data);
        console.log(response.data);
        } 
        catch(e){
            console.log(e);
        } 
        } 
        fetchData();
    
  },[props]);
  return (
    <div style={{backgroundColor:""}}>
      <Navbar props2={props}/>
       <div className="container center" style={{width: "100%"}}>        
        <br></br>
        <Row>
          
            <Card style={{ height: "30rem", width: "18rem", display: "inline-block", backgroundColor:"", margin: 10}}>
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
                <CardText
                  style={{
                    fontFamily: "Open Sans, Arial, sans-serif",
                    padding: "0px 20px 10px 20px",
                  }}
                >
                Owner : {item.owner.name}
                <br />
                Phone Number: {item.owner.phoneNumber}
                </CardText>
               
              </CardBody>
            </Card>
            
            
        </Row>
      </div>
    </div>
    );

}
CheckItem.propTypes = {
    checkItem: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { checkItem }
  )(withRouter(CheckItem));
  
  