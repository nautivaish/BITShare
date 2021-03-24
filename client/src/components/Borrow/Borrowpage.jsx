
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

function Borrowpage(props) {
  const [itemList, setItemList] = useState([]);
  const [search, setSearch] = useState("");
  const [realSearch, setRealSearch] = useState("");
  const [favouriteItemList, setFavouriteItemList] = useState([]);
  const eee = useSelector(state => state);
    console.log(eee);
    useEffect(() => {
        async function fetchData() { 
          const response2 = await axios.get("http://localhost:5000/api/items/fetchFavouriteItems/"+eee.auth.user.id);
          setFavouriteItemList(response2.data.map( a => a._id));
          console.log(response2.data);
          const response = await axios.get("http://localhost:5000/api/items/othersItems/"+eee.auth.user.id);
          setItemList(response.data);
        } 
      fetchData();
    }, []);

 

  const onCheckItemClick = (item) => {
    console.log(item);
    const pathwithid = "/borrowpage/" + item._id;
    props.history.push({
      pathname: pathwithid,
      state: { currentItem: item }
    });
  };
  const requestedItems = () => {    
    props.history.push("/requesteditems");
  };
  const borrowedItems = () => {
    props.history.push("/borroweditems");
  };
  const previousItems = () => {
    props.history.push("/previousitems");
  };

        
 const filteredItems = itemList.filter( item => {
   return item.name.toLowerCase().includes(realSearch.toLowerCase());
 });

 const handleSearchClick = e => {
   setRealSearch(search);
 };

  return (
  <div style={{backgroundColor:"#e8ffff"}}>
    <Navbar />
     <div className="container center" style={{width: "100%"}}>
      
      <input type="text" placeholder="Search" value={search} onChange={ e => setSearch(e.target.value) }/>
      <button onClick={handleSearchClick}>Search</button>      
      <br/>
      <Row>
        <Col>
        <Button onClick={requestedItems}>Pending Requests</Button>
        <Button onClick={borrowedItems}>Currently Borrowed Items</Button>
        <Button onClick={previousItems}>Borrow Again</Button>
        </Col>
      </Row>
      <button onClick={handleSearchClick}>Search</button>
      {filteredItems.map((item, index) => (<ItemCard item={item} key={index.toString()} img={item.image} name={item.name} price={item.price} onCheckItemClick={onCheckItemClick} favouriteItemList={favouriteItemList} />))}
      
 
     
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

