
import React, { Component, useState, useEffect } from "react";
import { Button, Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { deleteItem } from "../../actions/itemActions";
import { withRouter} from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from "../layout/Navbar";
import ItemCard from "./ItemCard";

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

    const onCheckStatusClick = async(request) => {
      const pathwithid = "/checkstatus/" + request;
      console.log(pathwithid);
      props.history.push({
      pathname: pathwithid,
      state: { name: request }
    });
  };

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
      <h3><b>Requests:</b></h3>
      <br></br>
    {requestList.map((request, index) => (
            // <ul  key={index.toString()}>
            //   {request}
            // </ul> 
            /* <React.Fragment>
            <ul className="list-group">
             <h5> <li className="list-group-item list-group-item-secondary" key={index.toString()}> {request}
             <button type="submit" className="btn btn-sm waves-effect waves-light hoverable blue accent-3 " onClick={ () => onCheckStatusClick(request)} style={{marginLeft: "10px"}}>Check Status</button>
             </li></h5>
            </ul>
            </React.Fragment> */
          <ItemCard name={request} b1="Check Status" F1={() => onCheckStatusClick(request)}/>
            // <ListGroup>
            // <ListGroup.Item variant="primary" key={index.toString()}>{request}</ListGroup.Item>
            // </ListGroup>
            ))}

{/* <React.Fragment>
        <ul className="list-group">
          {requestList.map((request, index) => (
            <li key={index.toString()} className="list-group-item list-group-item-blue accent-3">
              {request}
            </li>
          ))}
        </ul>
      </React.Fragment> */}
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

