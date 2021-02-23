import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames"; 
import { Link , withRouter} from "react-router-dom";
import { registerItem } from "../../actions/itemActions";


class AddItem extends Component {
  constructor() {
    super();
    this.state = {
    name: "",
    price: "",
    errors: {}      
    };
  }

  
onAddItemClick = e => {

       
    const newItem = {
        name: this.state.name,
        price: this.state.price
    };

    this.props.registerItem(newItem, this.props.history);      
    
};
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    e.preventDefault();

const newItem = {
      name: this.state.name,
      price: this.state.price
    };

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
            <label htmlFor="price">price</label> 
                <span className="red-text">{errors.price}</span>
              </div>
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
