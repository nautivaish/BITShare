
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { deleteItem } from "../../actions/itemActions";
import { withRouter} from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from "../layout/Navbar";
import ItemCard from "../Borrow/ItemCard";


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
  
        
 const filteredItems = itemList.filter( item => {
   return item.name.toLowerCase().includes(realSearch.toLowerCase());
 });

 

  return (
  <div>
    <Navbar props2={props}/>
     <div className="container center" style={{width: "100%"}}>
      
       
      <br></br>
      
      <div className="container center">
      
      </div>
      {filteredItems.length > 0 ?
      filteredItems.map((item, index) => (<ItemCard item={item} key={index.toString()} img={item.image} name={item.name} price={item.price} onCheckItemClick={onCheckItemClick} favouriteItemList={favouriteItemList} />))
      :
      <h3>No items found</h3> }
 
     
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

