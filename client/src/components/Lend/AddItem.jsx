import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames"; 
import { Link , withRouter} from "react-router-dom";
import { registerItem, } from "../../actions/itemActions";
import axios from "axios";


class AddItem extends Component {
  constructor() {
    super();
    this.state = {
    name: "",
    price: "",
    image: null,
    errors: {}      
    };
  }

  onImageUpdate = event => {
    
    // Update the state
    this.setState({ image: event.target.files[0] });
  
  };
 onAddItemClick = async(e) => {

  const formData = new FormData();
  formData.append("image", this.state.image);
  formData.append("name",this.state.name);
  formData.append("price",this.state.price);

    // this.props.registerItem(newItem, this.props.history);
    const response = await  axios.post("http://localhost:5000/api/items/postItem", formData);
    console.log(response);
    this.props.history.push("/lendpage");      
    
};
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    e.preventDefault();

//   this.props.registerItem(newItem, this.props.history); 
  };

render() {
    const { errors } = this.state;
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
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.price}
                  error={errors.price}
                  id="price"
                  type="Number"
                  className={classnames("", {
                    invalid: errors.price
                  })}
                />               
            <label htmlFor="price">Price(in Rs.)</label> 
                <span className="red-text">{errors.price}</span>
              </div>
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <input type="file" onChange={this.onImageUpdate} required />
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onAddItemClick}
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
}

AddItem.propTypes = {
  registerItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerItem }
)(withRouter(AddItem));
