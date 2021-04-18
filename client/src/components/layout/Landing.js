import React, { Component } from "react";
import { Link } from "react-router-dom";
import BPHCimg from "./BPHC_img.png";

class Landing extends Component {
  render() {
    return (
      <div style={{backgroundImage: "url("+BPHCimg+")", backgroundSize: "Cover", height:"100vh"}}>
      <div
        style={{height: "75vh"}}
        className="container valign-wrapper">
        <div className="row" style={{backgroundColor:"rgba(255,255,255,0.6)", padding: "20px", borderRadius:"25px"}}>
          <div className="col s12 center-align">
            <h1 style={{ margin: "0px" }}>BITShare</h1>
            <p style={{margin: "40px 0px 70px 0px"}} className="flow-text black-text text-darken-2">
              Sharing app of the Bitsians, by the Bitsians, for the Bitsians
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect hoverable white black-text"
              >
                Log In
              </Link>
            </div>
            <Link
                to="/admindashboard"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Admin Dashboard
              </Link>
          </div>
          </div>
        </div>
      </div>
    );

  }
}
export default Landing;