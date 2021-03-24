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

function Borrowpage(props) {
  const [itemList, setItemList] = useState([]);
  const [search, setSearch] = useState('');
  const eee = useSelector(state => state);
    console.log(eee);
    useEffect(() => {
        async function fetchData() { 
        const response = await axios.get("http://localhost:5000/api/items/othersItems/"+eee.auth.user.id);
        setItemList(response.data);
        } 
      fetchData();
    }, []);

 

  const onCheckItemClick = (item) => {
    // props.selecteditem = item;
    // console.log(props);
    console.log(item);
    // props.history.push("/borrowpage/" + item._id);
    const pathwithid = "/borrowpage/" + item._id;
    props.history.push({
      pathname: pathwithid,
      state: { currentItem: item }
    });
  };
      
 const filteredItems = itemList.filter( item => {
   return item.name.toLowerCase().includes(search.toLowerCase());
 });

  return (
  <div style={{backgroundColor:"#e8ffff"}}>
     <div className="container center" style={{width: "100%"}}>
      
      <input type="text" placeholder="Search" onChange={ e => setSearch(e.target.value) }/>
      {/* <button onClick={ e => setSearch(e.target.value) }>Search</button> */}
      
      <Row>
        {filteredItems.map((item, index) => (
          <Col>
            <ul key ={index.toString()}>
            
          <Card style={{ height: "30rem", width: "18rem", display: "inline-block", backgroundColor:"#e8ffff", margin: 10}}>
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
                style={{ width: "50%" }}
                onClick={() => onCheckItemClick(item)} // have to change
                className="btn  waves-light hoverable accent-3"
              >
                Check this item
              </Button>              
            </CardBody>
          </Card>
          </ul>
          </Col>
          
        ))}
      </Row>
      {/* <Row>
        {filteredItems.map((item, index) => (
          <Col>
            <ul key ={index.toString()}>
            {item.requests}

          </ul>
          </Col>
          
        ))}
      </Row> */}
    </div>
  </div>
  );
}

// export default Lendpage;

Borrowpage.propTypes = {
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteItem }
)(withRouter(Borrowpage));

