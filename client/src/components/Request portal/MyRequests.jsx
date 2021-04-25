
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
import ItemCard from "./ItemCard";

function MyRequests(props) {
  const [requestList, setRequestList] = useState([]);
  const [state, setState] = useState({name: ""});
  const eee = useSelector(state => state);
    console.log(eee);
    useEffect(() => {
        async function fetchData() { 
          const response = await axios.get("http://localhost:5000/api/users/getMyRequests/"+eee.auth.user.id);
          setRequestList(response.data);
        } 
      fetchData();
    }, []);
    const onAddRequestClick = async(e) => {

      console.log(state.name);
      const response = await  axios.post("http://localhost:5000/api/users/postRequest/"+eee.auth.user.id, { name: state.name});
      console.log(response);      
      window.location.reload();
      props.history.push("/myrequests");  
      
    };
    const onCheckStatusClick = async(request) => {
      const pathwithid = "/checkstatus/" + request;
      console.log(pathwithid);
      props.history.push({
      pathname: pathwithid,
      state: { name: request }
    });
      // props.history.push("/checkstatus",{name:request});       
      
    };
    const onDeleteRequestClick = async(request) => {
      try{
        const response = await  axios.post("http://localhost:5000/api/users/deleteRequest/"+eee.auth.user.id, { name: request});
        console.log(response);
      }
      catch(e){
        console.log(e);
      }
      window.location.reload();
      props.history.push("/myrequests");    
    };
    
  
const onChange = e => {
  setState(prevState => ({
                ...prevState,
                [e.target.id]: e.target.value
            }));
    //setState({ [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

//    props.registerItem(newItem,  props.history); 
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
        onClick={onAddRequestClick}
        className="btn btn-large waves-effect waves-light  hoverable accent-3"
      >
        Add Request
      </button> 
      <div>
      <form onSubmit={onSubmit}>
        <label>

          Name of Request Item:
          <input id="name" type="text" value={state.name} onChange={onChange} placeholder="Enter Name" size="sm"/>
        </label>
        
      </form>
      
      {/* {requestList.map((request, index) => (
           <ul key={index.toString()}> 
              {request} 
              <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"}}
                          onClick={() => onCheckStatusClick(request)}
                          type="submit"
                          className="btn btn-sm waves-effect waves-light hoverable blue accent-3">
        Check Status
      </button>


      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem"
        }}
        onClick={ () => onDeleteRequestClick(request)}
        type="submit"
        className="btn btn-sm waves-effect waves-light hoverable blue accent-3"
      >
        DeleteRequest
      </button>
            </ul> ))} */}
            <br></br>
            <br></br>
            <h4><b>My Requests</b></h4>
            <br></br>
{requestList.map((request, index) => (
          //  <ul key={index.toString()}> 
          //     {request} 
          /* <ul class="list-inline"> */

          <ItemCard name={request} b1="Check Status" b2="Delete Request" F1={() => onCheckStatusClick(request)} F2={() => onDeleteRequestClick(request)}/>
          /* <h5><li class="list-inline-item" key={index.toString()} > {request} :
          <button type="submit" className="btn btn-sm waves-effect waves-light hoverable blue accent-3 " onClick={ () => onCheckStatusClick(request)} style={{marginLeft: "10px"}}>Check Status</button>
          <button type="submit" className="btn btn-sm waves-effect waves-light hoverable blue accent-3 " onClick={ () => onDeleteRequestClick(request)} style={{marginLeft: "10px"}}>Delete Request</button></li></h5> */

          /* </ul> */
              


      
             ))}
      </div>      
     
    </div>
  </div>
  );
}


MyRequests.propTypes = {
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteItem }
)(withRouter(MyRequests));

