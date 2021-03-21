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


function Borrowitempage(props) {
    // console.log('starting hereee');
    console.log(props.location.state.currentItem);
    // console.log('ending hereee');
    const currentItem = props.location.state.currentItem;
    const eee = useSelector(state => state);
    console.log(eee);

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
                // onClick={() => } 
                className="btn  waves-light hoverable accent-3"
              >
                Borrow
              </Button>
            </CardBody>
          </Card>
    </div>
  </div>
  );
}

// export default Lendpage;

Borrowitempage.propTypes = {
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteItem }
)(withRouter(Borrowitempage));

