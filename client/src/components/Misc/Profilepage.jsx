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
          console.log("b4");
        const response = await axios.get("http://localhost:5000/api/users/getDetails/"+props.match.params.id);
        console.log("henlo");
        console.log(response);
        setDetails(response.data);
        } 
      fetchData();
    }, [props]);
    
    return(
        <div style={{backgroundColor:"#e8ffff"}}>
    <Navbar />
     <div className="container center" style={{width: "100%"}}></div>
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
    )
}

Profilepage.propTypes={
getDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps
  )(withRouter(Profilepage));
  