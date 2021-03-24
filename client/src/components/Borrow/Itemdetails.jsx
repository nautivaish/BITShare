import React, { Component,useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames"; 
import { Link , withRouter} from "react-router-dom";
import { registerItem, } from "../../actions/itemActions";
import axios from "axios";
import { useSelector } from 'react-redux';

function AddItem(props){
  const [state, setState] = useState({
    name: "",
    price: "",
    image: null,
    errors: {}
  });
  const eee = useSelector(state => state);
    console.log(eee);
  const onImageUpdate = event => {
    
    // Update the state
    setState(prevState => ({
                ...prevState,
                ["image"]: event.target.files[0]
            }));
    //setState({ ["image"]: event.target.files[0] });
  
  };
  const onAddItemClick = async(e) => {

    const formData = new FormData();
    console.log(state);
  formData.append("image", state.image);
  formData.append("name",state.name);
  formData.append("price",Number(state.price));

    //  props.registerItem(newItem,  props.history);
   
    const response = await  axios.post("http://localhost:5000/api/items/postItem/"+eee.auth.user.id, formData);
    console.log(response);
    props.history.push("/lendpage");      
    
  };
const onChange = e => {
  setState(prevState => ({
                ...prevState,
                [e.target.id]: e.target.value
            }));
    //setState({ [e.target.id]: e.target.value });
  };

const onSubmit = e => {
    e.preventDefault();

//    props.registerItem(newItem,  props.history); 
  };
 const { errors } = eee.errors;
  return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/lendpage" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Lend
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add Item </b> below
              </h4>              
            </div>
            <form noValidate onSubmit={ onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={ onChange}
                  value={ state.name}
                  error={errors}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={ onChange}
                  value={ state.price}
                  error={errors}
                  id="price"
                  type="Number"
                  className={classnames("", {
                    invalid: errors
                  })}
                />               
            <label htmlFor="price">Price(in Rs.)</label> 
                <span className="red-text">{errors}</span>
              </div>
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <input type="file" onChange={ onImageUpdate} required />
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={ onAddItemClick}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

// class AddItem extends Component {
//   constructor() {
//     super();
//      state = {
//     name: "",
//     price: "",
//     image: null,
//     errors: {}      
//     };
//   }

//   onImageUpdate = event => {
    
//     // Update the state
//      setState({ image: event.target.files[0] });
  
//   };
//  onAddItemClick = async(e) => {

//   const formData = new FormData();
//   formData.append("image",  state.image);
//   formData.append("name", state.name);
//   formData.append("price", state.price);

//     //  props.registerItem(newItem,  props.history);
//    const mapStateToProps = state => state;
//    console.log(mapStateToProps);
//     const response = await  axios.post("http://localhost:5000/api/items/postItem/"+ props.auth.user.id, formData);
//     console.log(response);
//     props.history.push("/lendpage");      
    
// };
// onChange = e => {
//     setState({ [e.target.id]: e.target.value });
//   };

// onSubmit = e => {
//   e.preventDefault();
//   const { errors } = state;
//   return (
//       <div className="container">
//         <div className="row">
//           <div className="col s8 offset-s2">
//             <Link to="/lendpage" className="btn-flat waves-effect">
//               <i className="material-icons left">keyboard_backspace</i> Back to
//               Lend
//             </Link>
//             <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//               <h4>
//                 <b>Add Item </b> below
//               </h4>              
//             </div>
//             <form noValidate onSubmit={ onSubmit}>
//               <div className="input-field col s12">
//                 <input
//                   onChange={ onChange}
//                   value={ state.name}
//                   error={errors.name}
//                   id="name"
//                   type="text"
//                   className={classnames("", {
//                     invalid: errors.name
//                   })}
//                 />
//                 <label htmlFor="name">Name</label>
//                 <span className="red-text">{errors.name}</span>
//               </div>
//               <div className="input-field col s12">
//                 <input
//                   onChange={ onChange}
//                   value={ state.price}
//                   error={errors.price}
//                   id="price"
//                   type="Number"
//                   className={classnames("", {
//                     invalid: errors.price
//                   })}
//                 />               
//             <label htmlFor="price">Price(in Rs.)</label> 
//                 <span className="red-text">{errors.price}</span>
//               </div>
              
//               <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//               <input type="file" onChange={ onImageUpdate} required />
//                 <button
//                   style={{
//                     width: "150px",
//                     borderRadius: "3px",
//                     letterSpacing: "1.5px",
//                     marginTop: "1rem"
//                   }}
//                   onClick={ onAddItemClick}
//                   type="submit"
//                   className="btn btn-large waves-effect waves-light hoverable blue accent-3"
//                 >
//                   Add item
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );

// //    props.registerItem(newItem,  props.history); 
//   };

// render() {
//     const { errors } =  state;
// return (
//       <div className="container">
//         <div className="row">
//           <div className="col s8 offset-s2">
//             <Link to="/lendpage" className="btn-flat waves-effect">
//               <i className="material-icons left">keyboard_backspace</i> Back to
//               Lend
//             </Link>
//             <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//               <h4>
//                 <b>Add Item </b> below
//               </h4>              
//             </div>
//             <form noValidate onSubmit={ onSubmit}>
//               <div className="input-field col s12">
//                 <input
//                   onChange={ onChange}
//                   value={ state.name}
//                   error={errors.name}
//                   id="name"
//                   type="text"
//                   className={classnames("", {
//                     invalid: errors.name
//                   })}
//                 />
//                 <label htmlFor="name">Name</label>
//                 <span className="red-text">{errors.name}</span>
//               </div>
//               <div className="input-field col s12">
//                 <input
//                   onChange={ onChange}
//                   value={ state.price}
//                   error={errors.price}
//                   id="price"
//                   type="Number"
//                   className={classnames("", {
//                     invalid: errors.price
//                   })}
//                 />               
//             <label htmlFor="price">Price(in Rs.)</label> 
//                 <span className="red-text">{errors.price}</span>
//               </div>
              
//               <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//               <input type="file" onChange={ onImageUpdate} required />
//                 <button
//                   style={{
//                     width: "150px",
//                     borderRadius: "3px",
//                     letterSpacing: "1.5px",
//                     marginTop: "1rem"
//                   }}
//                   onClick={ onAddItemClick}
//                   type="submit"
//                   className="btn btn-large waves-effect waves-light hoverable blue accent-3"
//                 >
//                   Add item
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }                 

AddItem.propTypes = {
  registerItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors:state.errors
});

export default connect(
  mapStateToProps,
  { registerItem }
)(withRouter(AddItem));
