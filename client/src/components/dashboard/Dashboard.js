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
    this.props.history.push("/borrowpage")
  };
  onRequestClick = e => {
    this.props.history.push("/lendpage")
  };

  render() {
    const { user } = this.props.auth;
    //console.log(user);

    return (
    <div style={{backgroundColor: "#e8ffff", height: "91vh"}}>
      <div style={{ height: "75vh"}} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h2 style={{color: "#213e3b", margin: "-50px 0px 0px 0px" }}>
              <b>Hello </b> {user.name.split(" ")[0]},
            </h2>
            <h3 style={{color: "#213e3b", margin: "0px 0px 80px 0px"}}>
              <br></br> What would you like to do?
            </h3>
            {/* <button
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
            </button> */}
          </div>
          <div>
            <button
              style={{
                width: "250px",
                height: "90px",
                fontSize: "25px",
                // fontFamily: "monospace",
                borderRadius: "5px",
                letterSpacing: "2.5px",
                marginTop: "1.5rem",
                marginRight: "2rem",
                marginLeft: "2rem",
                backgroundColor: "#41aea9"
              }}
              onClick={this.onLendClick}
              className="btn btn-large waves-effect waves-light hoverable accent-3"
            >
              Lend
            </button>
            <button
              style={{
                width: "250px",                
                height: "90px",
                fontSize: "25px",
                // fontFamily: "monospace",
                borderRadius: "5px",
                letterSpacing: "2.5px",
                marginTop: "1.5rem",
                marginRight: "2rem",
                marginLeft: "2rem",
                backgroundColor: "#0278ae"
              }}
              onClick={this.onBorrowClick}
              className="btn btn-large waves-effect waves-light hoverable  accent-3"
            >
              Borrow
            </button>
            <button
              style={{
                width: "250px",                
                height: "90px",
                fontSize: "25px",
                // fontFamily: "monospace",
                borderRadius: "5px",
                letterSpacing: "2.5px",
                marginTop: "1.5rem",
                marginRight: "2rem",
                marginLeft: "2rem",
                backgroundColor: "#00bcd4"
              }}
              onClick={this.onRequestClick}
              className="btn btn-large waves-effect waves-light hoverable accent-3"
            >
              Request
            </button>
          </div>
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