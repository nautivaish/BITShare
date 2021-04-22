import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from "../layout/Navbar";

function Profilepage(props) {
    const[details, setDetails] = useState({name: "",hostelName:"",phoneNumber:"",roomNumber:0});
    // const eee = useSelector(state => state);
    console.log(props.match.params.id);
    useEffect(() => {
        async function fetchData() { 
          const response = await axios.get("http://localhost:5000/api/users/getOwner/"+props.match.params.id);
          setDetails(response.data);
        } 
      fetchData();
    }, [props]);
    
    return(
        <div style={{backgroundColor:""}}>
    <Navbar props2={props}/>
     <div className="container center" style={{width: "100%"}}>
        <h3><b>My Profile</b></h3>
        <br></br>
        <h5><div>Name: {details.name}</div>
        <br></br>
        <div>Email: {details.email}</div>
        <br></br>
        <div>Hostel Name: {details.hostelName}</div>
        <br></br>
        <div>Room number: {details.roomNumber}</div>
        <br></br>
        <div>Phone Number: {details.phoneNumber}</div></h5>
        
        
        
        </div>
      </div>
    )
}

Profilepage.propTypes={
getOwner: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps
  )(withRouter(Profilepage));
  