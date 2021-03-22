import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import LendButton from './LendButton';
import BorrowButton from './BorrowButton';
import ReqeustButton from './RequestButton';
import ProfileButton from './ProfileButton';

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
  onProfileClick = async (user) => {
    this.props.history.push("/profilepage/"+user.id)
  };

  render() {
    const { user } = this.props.auth;
    console.log(user);

    return (
    <div style={{ height: "91vh"}}>
    <Navbar />
      <div style={{ height: "75vh"}} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h2 style={{margin: "-50px 0px 0px 0px" }}>
              <b>Hello </b> {user.name.split(" ")[0]},
            </h2>
            <h3 style={{margin: "0px 0px 80px 0px"}}>
              <br></br> What would you like to do?
            </h3>
            
          </div>
          <div>
            <LendButton onClick={this.onLendClick}/>
            <BorrowButton onClick={this.onBorrowClick} />
            <ReqeustButton onClick={this.onLendClick}/>
            <ProfileButton onClick={() => this.onProfileClick(user)}/>
            
            
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