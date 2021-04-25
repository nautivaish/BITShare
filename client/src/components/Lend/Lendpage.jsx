import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col
} from "reactstrap";

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
import List from "@material-ui/core/List";
import MyListItem from "./MyListItem";
import { makeStyles } from "@material-ui/core/styles";
import "./split.css"
import whee from './../../img/7.jpg'

function Lendpage(props) {
  const [itemList, setItemList] = useState([]);
  // const requestArray [item name, image of dimension 10*10, requestor name ]
  const eee = useSelector(state => state);
  console.log(eee);
  useEffect(() => {

    async function fetchData() {
      const response = await axios.get("http://localhost:5000/api/items/getItems/" + eee.auth.user.id);
      setItemList(response.data);
    }
    fetchData();

  }, []);

  const onAddItemClick = e => {
    props.history.push("/additem");
  };
  const onDeleteItemClick = async (item) => {
    console.log(item);
    const response = await axios.post("http://localhost:5000/api/items/deleteItem/" + eee.auth.user.id, { id: item._id });
    console.log(response);
    window.location.reload();
    props.history.push("/lendpage");
  };
  const onAcceptClick = async (item, borrower) => {
    // console.log(item);
    const response = await axios.post("http://localhost:5000/api/items/acceptRequest/" + borrower, { id: item._id });
    console.log(response);
    window.location.reload();
    props.history.push("/lendpage");
  };
  const onRejectClick = async (item, borrower) => {
    // console.log(item);
    const response = await axios.post("http://localhost:5000/api/items/rejectRequest/" + borrower, { id: item._id });
    console.log(response);
    window.location.reload();
    props.history.push("/lendpage");
  };
  const onReturnClick = async (item) => {
    console.log("123123");
    const response = await axios.post("http://localhost:5000/api/items/returnItem/", { id: item._id });
    console.log(response);
    window.location.reload();
    props.history.push("/lendpage");
  };


  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    mycenter: {
      display: 'inline-block',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();

  const isempty = () => {
    var cnt = 0;
    itemList.forEach((item) => cnt += item.requests.length);
    return !cnt;
    // return !cnt;
  };

  const isItemsEmpty = () => {
    var cnt = 0;
    // itemList.forEach((item) => cnt++);
    cnt = itemList.length;
    console.log((cnt));
    return !cnt;
  };

  return (
    // <div style={{backgroundImage: "url("+whee+")", backgroundSize: "Cover", backgroundRepeat:"repeat-y",marginBottom:"0px"}}>
    <div>
      <Navbar props2={props}/>
      <div className="container center" style={{ width:"100%", }}>
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            margin: "2rem",
            // backgroundColor: "#0278ae"
            backgroundColor: "#3f51b5"
          }}
          onClick={onAddItemClick}
          className="btn btn-large waves-effect waves-light hoverable accent-3"
        >
          Add Item
      </button>
        <br></br>
        {/* <div className="left"> */}
        {isempty() ? <h4>No pending requests</h4> : <h3>Requests</h3> }
        <List className={classes.mycenter} style={{ maxHeight: '100px', overflow: 'auto' }}>
          {itemList.map((item, index) => (
            item.requests.map((itemRequest, index2) =>
              <MyListItem key={index2.toString() + index.toString()} item={item} itemRequest={itemRequest} onAcceptClick={() => onAcceptClick(item, itemRequest._id)} onRejectClick={() => onRejectClick(item, itemRequest._id)} />
            )))}
          {/* <Col>
            <ul key ={index2.toString()+index.toString()}>
              {item.name} :: Requested by : {itemRequest.name}  
              <Button
                style={{ width: "100%", color: "green" }}
                onClick={() => onAcceptClick(item,itemRequest._id)}
                className="btn  waves-light hoverable accent-3"
              >
                Accept
              </Button>
              <Button
                style={{ width: "100%", color:"red" }}
                onClick={() => onRejectClick(item,itemRequest._id)}
                className="btn  waves-light hoverable accent-3"
              >
                Reject
              </Button>  
          
            </ul>
          </Col> */}


        </List>
        {/* </div> */}
        {/* <div className="right"> */}
        <br></br>
        <br></br>
        {!isItemsEmpty()? <h3>My items</h3> : <h3>No items uploaded!!!</h3>}
        <Row>
          {itemList.map((item, index) => (
            <ItemCard item={item} onDeleteItemClick={() => onDeleteItemClick(item)} onReturnClick={() => onReturnClick(item)} />
          ))}

        </Row>
        {/* </div> */}
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

