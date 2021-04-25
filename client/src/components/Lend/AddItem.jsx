import React, { Component,useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames"; 
import { Link , withRouter} from "react-router-dom";
import { registerItem } from "../../actions/itemActions";
import axios from "axios";
import { useSelector } from 'react-redux';
import Navbar from "../layout/Navbar";

function AddItem(props){
  const [state, setState] = useState({
    name: "",
    price: "",
    image: null,
    errors: {}
  });
  const [tags, setTags] = useState([]);
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
    formData.append("name", state.name);
    formData.append("price", Number(state.price));
    formData.append("tags", [...tags]);
    //  props.registerItem(newItem,  props.history);
   
    const response = await  axios.post("http://localhost:5000/api/items/postItem/"+eee.auth.user.id, formData);
    props.history.push("/lendpage");      
    
  };
const onChange = e => {
  setState(prevState => ({
                ...prevState,
                [e.target.id]: e.target.value
            }));
    //setState({ [e.target.id]: e.target.value });
  };

const onTagClick = e => {
  if(tags.includes(e.target.id))
    setTags(tags.filter(item => item !== e.target.id))
  else
    setTags([...tags, e.target.id])
};

const onSubmit = e => {
    e.preventDefault();
//    props.registerItem(newItem,  props.history); 
  };

 const { errors } = eee.errors;
  return (
    <div>
    <Navbar props2={props}/>
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/lendpage" className="btn-flat waves-effect grey-text">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Lend
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add Item </b> below
              </h4>              
            </div>
            <form noValidate onSubmit={ onSubmit }>
              <div className="input-field col s12">
                <input
                  onChange={ onChange }
                  value={ state.name }
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
              
              <div className="col s12">
              <h6>Add Tags:</h6>
              <input type="checkbox"  id="Sports" onClick={onTagClick} style={{opacity: "1", pointerEvents: "auto", margin:"5px 3px 3px 4px"}}/>
              <label htmlFor="Sports" style={{paddingLeft:"20px"}}> Sports</label><br/>
              <input type="checkbox"  id="Clothes" onClick={onTagClick} style={{opacity: "1", pointerEvents: "auto", margin:"5px 3px 3px 4px"}}/>
              <label htmlFor="Clothes" style={{paddingLeft:"20px"}}> Clothes</label><br/>
              <input type="checkbox"  id="Electrical Appliance" onClick={onTagClick} style={{opacity: "1", pointerEvents: "auto", margin:"5px 3px 3px 4px"}}/>
              <label htmlFor="Electrical Appliance" style={{paddingLeft:"20px"}}> Electrical Appliance</label><br/>
              <input type="checkbox"  id="Academic" onClick={onTagClick} style={{opacity: "1", pointerEvents: "auto", margin:"5px 3px 3px 4px"}}/>
              <label htmlFor="Academic" style={{paddingLeft:"20px"}}> Academic</label><br/>
              
              </div>
              
              
              <input type="checkbox" />
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <input type="file" onChange={ onImageUpdate} required />
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  backgroundColor: "#3f51b5"
                }}
                onClick={ onAddItemClick }
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable accent-3"
              >
                Add item
              </button>
              </div>
            </form>

            
            
          </div>
        </div>
      </div>
    </div>
    );
}             

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
