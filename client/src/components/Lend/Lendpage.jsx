import { Card, Button, CardBlock } from "reactstrap";

import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

// class Lendpage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       itemList:[]
//     };
//   }
// //   function starting() { 
// //   
// // }
//   //starting();
//   componentDidMount() {
//     try{
//       let currentComponent = this;
//       axios.get("http://localhost:5000/api/items/getItems").then((response) => { 
//         console.log(response.data);
//         // currentComponent.setState({ itemList: response.data });

//         var items = [];
//         for (var i=0 ; i<response.length ; i++){
//           var item = response[i].data;
//           items.push(item);
                   
//         }
//         this.setState({itemList: items});    
//       });
//     } catch(e)
//     {
//       console.log(e);
//     }
    
    
// }
// renderItemList() {
//   return (
//     <React.Fragment>
//       { this.state.itemList.map((item) => (
//         <li>{item}</li>
//       ))}
//     </React.Fragment>
//   );
// }
//   onAddItemClick = e => {
//     this.props.history.push("/additem")
//   };
// onChange = e => {
//     this.setState({ [e.target.id]: e.target.value });
//   };

//   onSubmit = e => {
//     e.preventDefault();
//   }

// render() {
//     const { errors } = this.state;
// return (
//   <div className="container">
         
         
    
//         <button
//           style={{
//             width: "150px",
//             borderRadius: "3px",
//             letterSpacing: "1.5px",
//             marginTop: "1rem"
//           }}
//           onClick={this.onAddItemClick}
//           className="btn btn-large waves-effect waves-light hoverable blue accent-3"
//         >
//       Add Item
//         </button>
//         {/* {this.renderItemList} */}
//         {this.state.itemList.map((item,index) => (<ul key ={index.toString()}>{item.name}hi</ul>))}
               
//       </div>
//     );
//   }

// }

function Lendpage(props){
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
   
    async function fetchData() { 
      const response = await axios.get("http://localhost:5000/api/items/getItems");
    setItemList(response.data);
    } 
    fetchData();
    
  }, []);

  const onAddItemClick = e => {
    props.history.push("/additem");
  };

  
    
  return (
    <div className="container">    
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem"
        }}
        onClick={onAddItemClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      >
        Add Item
      </button>
      {/* {this.renderItemList} */}
      {itemList.map((item,index) => (<ul key ={index.toString()}>{item.name} {item.price}</ul>))}
              
    </div>
  );
}

export default Lendpage;
