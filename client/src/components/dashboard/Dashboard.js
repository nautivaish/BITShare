import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import LendButton from './LendButton';
import BorrowButton from './BorrowButton';
import ReqeustButton from './RequestButton';
import ProfileButton from './ProfileButton';
import whee from './../../img/7.jpg'
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
    this.props.history.push("/requests")
  };
  onProfileClick = async (user) => {
    this.props.history.push("/profilepage/"+user.id)
  };
  onFavouriteClick = e => {
    this.props.history.push("/myfavouriteitems");
  };

  render() {
    console.log(this.props.history);
    const { user } = this.props.auth;
    console.log(user);

    return (
    // <div style={{ height: "100vh" ,backgroundImage: "url("+whee+")", backgroundSize: "Cover", backgroundRepeat:"repeat-y"}}>
    <div>
    <Navbar props2={this.props}/>
      <div style={{ height: "75vh"}} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h2 style={{margin: "-50px 0px 0px 0px",color:"white" }}>
              <b>Hello </b> {user.name.split(" ")[0]},
            </h2>
            <h3 style={{margin: "0px 0px 80px 0px",color:"white"}}>
              <br></br> What would you like to do?
            </h3>
            
          </div>
          <div>
            <LendButton onClick={this.onLendClick}/>
            <BorrowButton onClick={this.onBorrowClick} />
            <ReqeustButton onClick={this.onRequestClick}/>
            {/* <ProfileButton onClick={() => this.onProfileClick(user)}/> */}
            {/* <button onClick={this.onFavouriteClick} />  */}
            
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