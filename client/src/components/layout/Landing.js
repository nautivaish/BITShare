import React, { Component } from "react";
import { Link } from "react-router-dom";
import BPHCimg from "./8.jpg";
import frontimg from "./7.jpg"
import admin from "./admin.png"
class Landing extends Component {
  render() {
    return (
      <body style={{backgroundImage: "url("+BPHCimg+")", backgroundSize: "Cover"}}>
      
        <div style={{alignItems:"right",position:"absolute",top:5,right:5}}>
        <Link
                to="/adminlogin"
                style={{
                  width: "60px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
              >
                        <img src={admin} style={{height:"50px", borderRadius:"50%"}}  />

              </Link>
        {/* <img src={admin} style={{height:"50px", borderRadius:"50%",position:"absolute",right:"5",top:"5", left:"50",bottom:"50"}} href="/admindashboard" /> */}
        </div>
        
      <div
        style={{width:"1200px",paddingTop:"100px",paddingLeft:"50px",paddingRight:"50px",height:"100vh"}}
        className="container">
        <div className="row" style={{backgroundImage: "url("+frontimg+")",backgroundSize: "Cover", height:"60%", padding: "40px", borderRadius:"25px"}}>
          <div className="col s12 center-align">
            <h1 style={{ margin: "0px",fontSize:"700%",color:"black"}}><b>BITShare</b></h1>
            
            <br />
            <br/>
            <br/>
            <div className="col s6" style={{paddingTop:"60px"}}>
              <Link
                to="/register"
                className="btn btn-large waves-effect waves-light hoverable  accent-3"
                style={{
                  width: "250px",
                  // height:"60px",
                  borderRadius: "5px",
                  letterSpacing: "3px",
                  backgroundColor:"#0000A0",
                  fontSize:"130%",
                                
                }}
                
              >
                <b>Register</b>
              </Link>
            </div>
            <div className="col s6" style={{paddingTop:"60px"}}>
              <Link
                to="/login"
                style={{
                  width: "250px",
                  // height:"60px",
                  borderRadius: "5px",
                  letterSpacing: "3px",
                  backgroundColor:"#0000A0",
                  fontSize:"130%"
                }}
                className="btn btn-large waves-effect waves-light hoverable  accent-3"
              ><b>Log In</b>
                
              </Link>
            </div>
          </div>
          </div>
        </div>
      
      </body>
    );

  }
}
export default Landing;