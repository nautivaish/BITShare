
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

// import { view } from '@risingstack/react-easy-state';
// import SearchBar from 'material-ui-search-bar';
// import LinearProgress from '@material-ui/core/LinearProgress';


function Borrowpage(props) {
  const [itemList, setItemList] = useState([]);
  const [search, setSearch] = useState("");
  const [realSearch, setRealSearch] = useState("");
  const [favouriteItemList, setFavouriteItemList] = useState([]);
  const eee = useSelector(state => state);
    console.log(eee);
    useEffect(() => {
        async function fetchData() { 
          const response2 = await axios.get("/api/items/fetchFavouriteItems/"+eee.auth.user.id);
          setFavouriteItemList(response2.data.map( a => a._id ));
          console.log(response2.data);
          const response = await axios.get("/api/items/othersItems/"+eee.auth.user.id);
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
  <div>
    <Navbar />
     <div className="container center" style={{width: "100%"}}>
      
      <input type="text" placeholder="Search" value={search} onChange={ e => setSearch(e.target.value) }/>
      {/* <button onClick={handleSearchClick}>Search</button>  */}
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          margin: "2rem",
          // backgroundColor: "#0278ae"
          backgroundColor: "#3f51b5"
        }}
        onClick={handleSearchClick}
        className="btn btn-large waves-effect waves-light  hoverable accent-3"
      >
        Search
      </button>     
      <br></br>
      {/* <button onClick={handleSearchClick}>Search</button>       */}
      <br/>
      <div className="container center">
      <Row>
        <Col>
        <button
        style={{
          width: "auto",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          margin: "1rem",
          // backgroundColor: "#845ec2"
          // background: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)"
          // background: rgb(2,0,36);
          // background: linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(8,30,135,1) 42%, rgba(0,212,255,1) 100%);
        }}
        onClick={requestedItems}
        className="btn btn-large waves-effect waves-light  hoverable accent-3"
      >
        Pending Requests
      </button> 
      </Col>
      <Col> 
      <button
        style={{
          width: "auto",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          margin: "1rem",
          // backgroundColor: "#0278ae"
        }}
        onClick={borrowedItems}
        className="btn btn-large waves-effect waves-light  hoverable accent-3"
      >
        Currently Borrowed Items
      </button>
      </Col>
      <Col> 
      <button
        style={{
          width: "auto",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          margin: "1rem",
          // backgroundColor: "#0278ae"
        }}
        onClick={previousItems}
        className="btn btn-large waves-effect waves-light  hoverable accent-3"
      >
        Borrow Again
      </button> 
        {/* <Button onClick={requestedItems}>Pending Requests</Button> */}
        {/* <Button onClick={borrowedItems}>Currently Borrowed Items</Button> */}
        {/* <Button onClick={previousItems}>Borrow Again</Button> */}
        </Col>
      </Row>
      </div>
      {/* <button onClick={handleSearchClick}>Search</button> */}
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

