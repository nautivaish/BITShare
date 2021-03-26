
import React, { Component, useState, useEffect } from "react";
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
          const response2 = await axios.get("http://localhost:5000/api/items/fetchFavouriteItems/"+eee.auth.user.id);
          setFavouriteItemList(response2.data.map( a => a._id));
          console.log(response2.data);
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
      <button onClick={handleSearchClick}>Search</button>      
      <br></br>
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

