import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onLendClick = e => {
    this.props.history.push("/lendpage")
  };
  onBorrowClick = e => {
    this.props.history.push("/lendpage")
  };
  onRequestClick = e => {
    this.props.history.push("/lendpage")
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
          <div>
          <button
              style={{
                width: "250px",
                borderRadius: "5px",
                letterSpacing: "2.5px",
                marginTop: "1.5rem",
                marginRight: "2rem",
                marginLeft: "2rem"
              }}
              onClick={this.onLendClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Lend
            </button>
            <button
              style={{
                width: "250px",
                borderRadius: "5px",
                letterSpacing: "2.5px",
                marginTop: "1.5rem",
                marginRight: "2rem",
                marginLeft: "2rem"
              }}
              onClick={this.onBorrowClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Borrow
            </button>
            <button
              style={{
                width: "250px",
                borderRadius: "5px",
                letterSpacing: "2.5px",
                marginTop: "1.5rem",
                marginRight: "2rem",
                marginLeft: "2rem"
              }}
              onClick={this.onRequestClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Request
            </button> 
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);