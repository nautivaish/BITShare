
import React, { Component, useState, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { deleteItem } from "../../actions/itemActions";
import { withRouter} from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from "../layout/Navbar";
// import ItemCard from "./ItemCard";

// import { view } from '@risingstack/react-easy-state';
// import SearchBar from 'material-ui-search-bar';
// import LinearProgress from '@material-ui/core/LinearProgress';


function Requests(props) {
  const [requestList, setRequestList] = useState([]);
  
  const eee = useSelector(state => state);
    console.log(eee);
    useEffect(() => {
        async function fetchData() { 
          const response = await axios.get("http://localhost:5000/api/users/getRequests/"+eee.auth.user.id);
          setRequestList(response.data);
        } 
      fetchData();
    }, []);
    const onMyRequestsClick = e => {
        props.history.push("/myrequests")
      };
  return (
  <div>
    <Navbar props2={props}/>
     <div className="container center" style={{width: "100%"}}>
      
      <button
        style={{
        //   width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          margin: "2rem",
          // backgroundColor: "#0278ae"
          backgroundColor: "#3f51b5"
        }}
        onClick={onMyRequestsClick}
        className="btn btn-large waves-effect waves-light  hoverable accent-3"
      >
        My Requests
      </button>       
     
    </div>
    <div style={{textAlign:"center"}}>
    {requestList.map((request, index) => (
            <ul key={index.toString()}>
              {request}
            </ul> ))}
    </div>
  </div>
  );
}

// export default Lendpage;

Requests.propTypes = {
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteItem }
)(withRouter(Requests));

