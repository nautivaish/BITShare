import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button } from "reactstrap"

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
      return (
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper" style={{backgroundColor: "#e8ffff"}}>
              <Link
                to="/dashboard"
                style={{
                  fontFamily: "monospace",
                }}
                className="col s5 brand-logo center blue-text"
              >
                <i className="material-icons">share</i>
                BITShare
              </Link>
              <button 
                onClick={this.onLogoutClick}
                // className="right"
                className="btn hoverable right blue white-text accent-3"
                style={{height:"auto", width:"65px", borderRadius:"50px"}}
              >
                <i className="material-icons">logout</i>
              </button>
            </div>
          </nav>
        </div>
      );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
// export default Navbar;