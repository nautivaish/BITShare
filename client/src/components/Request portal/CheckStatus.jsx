
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
import ItemCard from "../Borrow/ItemCard";

// import { view } from '@risingstack/react-easy-state';
// import SearchBar from 'material-ui-search-bar';
// import LinearProgress from '@material-ui/core/LinearProgress';


function CheckStatus(props) {
  console.log(props.location.state.name);
  const [itemList, setItemList] = useState([]);
  // const [search, setSearch] = useState("");
  const realSearch = props.location.state.name;
  const [favouriteItemList, setFavouriteItemList] = useState([]);
  const eee = useSelector(state => state);
    console.log(eee);
    useEffect(() => {
        async function fetchData() { 
          const response2 = await axios.get("http://localhost:5000/api/items/fetchFavouriteItems/"+eee.auth.user.id);
          setFavouriteItemList(response2.data.map( a => a._id ));
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

 

  return (
  <div>
    <Navbar props2={props}/>
     <div className="container center" style={{width: "100%"}}>
      
       
      <br></br>
      {/* <button onClick={handleSearchClick}>Search</button>       */}
      <br/>
      <div className="container center">
      
      </div>
      {/* <button onClick={handleSearchClick}>Search</button> */}
      {filteredItems.map((item, index) => (<ItemCard item={item} key={index.toString()} img={item.image} name={item.name} price={item.price} onCheckItemClick={onCheckItemClick} favouriteItemList={favouriteItemList} />))}
      
 
     
    </div>
  </div>
  );
}

// export default Lendpage;

CheckStatus.propTypes = {
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteItem }
)(withRouter(CheckStatus));

