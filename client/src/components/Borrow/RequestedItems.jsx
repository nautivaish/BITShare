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
  import Navbar from "../layout/Navbar";
  import ItemCard from "./ItemCard2";
  
  
export default  function RequestedItems(props){
    const [itemList, setItemList] = useState([]);
    // const requestArray [item name, image of dimension 10*10, requestor name ]
    const eee = useSelector(state => state);
      console.log(eee);
      useEffect(() => {
      
      async function fetchData() { 
        const response = await axios.get("http://localhost:5000/api/items/requestedItems/"+eee.auth.user.id);
        console.log(response.data);
        setItemList(response.data.requestedItems);
      } 
      fetchData();
      
    }, []);
  
    
    const onDeleteRequestClick = async (item) => {
      // console.log(item);
      const response  = await axios.post("http://localhost:5000/api/items/rejectRequest/"+eee.auth.user.id, { id: item._id });
      console.log(response);
      window.location.reload(); 
      props.history.push("/requesteditems");
    };
    
    
  
    
      
    return (
    <div style={{backgroundColor:""}}>
      <Navbar props2={props}/>
      <h3 className="center">Requested Items</h3>
      <br/><br/>
       <div className="container center" style={{width: "100%"}}>
        {
        <Row>
          {itemList.map((item, index) => (
            
             <ItemCard item={item} key={index.toString()} img={item.image} name={item.name} price={item.price} Function={() => onDeleteRequestClick(item)} buttonname="Delete Request" />
          ))}
        </Row> }
  
        
      </div>
    </div>
    );
  }
  

  {/* <Col>
              <ul key ={index.toString()}>
              
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
                
                <Button
                  style={{ width: "100%" }}
                  onClick={() => onDeleteRequestClick(item)}
                  className="btn  waves-light hoverable accent-3">
                  Delete Request
                </Button>               
              </CardBody>
            </Card>
            </ul>
            </Col>
             */}
 
//   export default RequestedItems;
  

//   const mapStateToProps = state => ({
//     errors: state.errors
//   });
  
//   export default connect(
//     mapStateToProps,
//   )(withRouter(RequestedItems));
  
  