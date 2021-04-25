import React, { useState, useEffect } from "react";
import { Link , withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Dropdown, DropdownButton } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: theme.spacing(1),
      minWidth: 320
    },
    // selectEmpty: {
    //   marginTop: theme.spacing(2)
    // }
}));

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
    setState({...state, ["hostelName"]: e.target.value });
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

  const classes = useStyles();

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

            {/* ---------------------------------------------------------------------------------- */}
                            
            <div className="input-field col s12">

                {/* <input
                value={this.state.hostelName}
                error={errors.hostelName}
                id="hostelName"
                type="text"
                className={classnames("", {
                    invalid: errors.hostelName
                })}
                readonly /> */}
                {/* <select id="hostelName" name="hostelName" style={{display: "block"}} className={classnames("", {
                    invalid: state.errors.hostelName
                })}>
                    <option onClick={onClick} value={state.hostelName} id={"Meera Bhawan"}>Meera Bhawan</option>
                    <option onClick={onClick} value={state.hostelName} id={"Malaviya Bhawan"}>Malaviya Bhawan</option>
                    <option onClick={onClick} value={state.hostelName} id={"Budh Bhawan"}>Budh Bhawan</option>
                    <option onClick={onClick} value={state.hostelName} id={"Valmiki Bhawan"}>Valmiki Bhawan</option>
                </select> */}

                {/* <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="hostelName-label">Hostel</InputLabel>
                <Select
                labelId="hostelName-label"
                id="hostelName"
                value={this.state.hostelName}
                onChange={this.onClick}
                >
                <MenuItem value={"Meera Bhawan"}>Meera Bhawan</MenuItem>
                <MenuItem value={"Malaviya Bhawan"}>Malaviya Bhawan</MenuItem>
                <MenuItem value={"Budh Bhawan"}>Budh Bhawan</MenuItem>
                <MenuItem value={"Valmiki Bhawan"}>Valmiki Bhawan</MenuItem>
                </Select>
                </FormControl> */}

                <FormControl className={classes.formControl}>
                <InputLabel id="hostelName-label" style={{color: "grey", fontSize: "15px", marginLeft: "0px", paddingLeft: "0px"}}>Hostel</InputLabel>
                <Select
                labelId="hostelName-label"
                id="hostelName"
                value={state.hostelName}
                onChange={onClick}
                style={{color: "white"}}
                >
                <MenuItem value={"Meera Bhawan"}>Meera Bhawan</MenuItem>
                <MenuItem value={"Malaviya Bhawan"}>Malaviya Bhawan</MenuItem>
                <MenuItem value={"Budh Bhawan"}>Budh Bhawan</MenuItem>
                <MenuItem value={"Valmiki Bhawan"}>Valmiki Bhawan</MenuItem>
                </Select>
            </FormControl>

                {/* <DropdownButton id="hostelName" title="Select Hostel">
                <Dropdown.Item id="Meera Bhawan" onClick={this.onClick}>Meera Bhawan      </Dropdown.Item>
                <Dropdown.Item id="Malaviya Bhawan" onClick={this.onClick}>Malaviya Bhawan               </Dropdown.Item>
                <Dropdown.Item id="Budh Bhawan" onClick={this.onClick}>Budh Bhawan           </Dropdown.Item>
                <Dropdown.Item id="Valmiki Bhawan" onClick={this.onClick}>Valmiki Bhawan           </Dropdown.Item>

                </DropdownButton> */}
                <div>
                <span className="red-text">{state.errors.hostelName}</span>

                </div>
                </div>

            {/* ---------------------------------------------------------------------------------- */}
       




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