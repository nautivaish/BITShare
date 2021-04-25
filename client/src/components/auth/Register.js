import React, { useState, useEffect } from "react";
import { Link , withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Dropdown, DropdownButton } from "react-bootstrap";

function Register(props){
  const [state, setState] = useState({
      name: "",
      email: "",
      hostelName: "",
      roomNumber: "",
      phoneNumber: "",
      password: "",
      password2: "",
      errors: {}
    });
  useEffect(() => {
      
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    
  }, []);
  useEffect(()=>{
    if (props.errors) {
      setState({
        ...state,
        errors: props.errors
      });
    }
  },[props]);


  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     setState({
  //       errors: nextProps.errors
  //     });
  //   }
  // }
  

  const onChange = e => {
  setState({ ...state, [e.target.id]: e.target.value });
  };
  const onClick = e => {
    setState({...state, ["hostelName"]: e.target.id });
  }

  const onSubmit = e => {
    e.preventDefault();

      const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
      hostelName: state.hostelName,
      roomNumber: state.roomNumber,
      phoneNumber: state.phoneNumber
    };

  props.registerUser(newUser, props.history); 
  };


  return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect grey-text">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={onSubmit} >
              <div className="input-field col s12" >
                <input
                  onChange={onChange}
                  value={state.name}
                  error={state.errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: state.errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{state.errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.email}
                  error={state.errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: state.errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{state.errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  value={state.hostelName}
                  error={state.errors.hostelName}
                  id="hostelName"
                  type="text"
                  className={classnames("", {
                    invalid: state.errors.hostelName
                  })}
              readonly
            />

            <DropdownButton id="hostelName" title="Select Hostel">
              <Dropdown.Item id="Meera Bhawan" onClick={onClick}>Meera Bhawan      </Dropdown.Item>
              <Dropdown.Item id="Malaviya Bhawan" onClick={onClick}>Malaviya Bhawan               </Dropdown.Item>
              <Dropdown.Item id="Budh Bhawan" onClick={onClick}>Budh Bhawan           </Dropdown.Item>
              <Dropdown.Item id="Valmiki Bhawan" onClick={onClick}>Valmiki Bhawan           </Dropdown.Item>

            </DropdownButton>
                {/* <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Hostel Name
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item >Meera Bhawan</Dropdown.Item>
                    <Dropdown.Item onSelect={onChange} >Malaviya Bhawan</Dropdown.Item>
                    <Dropdown.Item >Budh Bhawan</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                <span className="red-text">{state.errors.hostelName}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.roomNumber}
                  error={state.errors.roomNumber}
                  id="roomNumber"
                  type="Number"
                  className={classnames("", {
                    invalid: state.errors.roomNumber
                  })}
                />
                <label htmlFor="roomNumber">Room Number</label>
                <span className="red-text">{state.errors.roomNumber}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.phoneNumber}
                  error={state.errors.phoneNumber}
                  id="phoneNumber"
                  type="Number"
                  className={classnames("", {
                    invalid: state.errors.phoneNumber
                  })}
                />
                <label htmlFor="phoneNumber">Phone Number </label>
                <span className="red-text">{state.errors.phoneNumber}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.password}
                  error={state.errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: state.errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{state.errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.password2}
                  error={state.errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: state.errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{state.errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));