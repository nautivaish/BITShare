
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

  const onAddItemClick = e => { // have to change
    props.history.push("/additem");
  };
  const onDeleteItemClick = async (item) => { // have to change
    // console.log(item);
    const response  = await axios.post("http://localhost:5000/api/items/deleteItem/"+eee.auth.user.id, { id: item._id });
    console.log(response);
    window.location.reload(); 
    props.history.push("/lendpage");
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
      
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          margin: "2rem",
          backgroundColor: "#0278ae"
        }}
        onClick={onAddItemClick} // have to change
        className="btn btn-large waves-effect waves-light hoverable accent-3"
      >
        Add Item
      </button>
      <br></br>
      {filteredItems.map((item, index) => (<ItemCard item={item} key={index.toString()} img={item.image} name={item.name} price={item.price} onDeleteItemClick={onDeleteItemClick} favouriteItemList={favouriteItemList} />))}
      {/* <Row>
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
                style={{ width: "100%" }}
                onClick={() => onDeleteItemClick(item)} // have to change
                className="btn  waves-light hoverable accent-3"
              >
                Borrow
              </Button>
            </CardBody>
          </Card>
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

