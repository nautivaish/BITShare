import React, { Component,useState } from "react";
import {useHistory} from 'react-router-dom';

import "./css.css";

function AdminLogin(props) {
  const history = useHistory();

  const [state, setState] = useState({
    username: "",
    password:"",
  });
  const onChange = e => {
    setState(prevState => ({
                  ...prevState,
                  [e.target.id]: e.target.value
              }));
      //setState({ [e.target.id]: e.target.value });
    };
    const onSubmit = e => {
      e.preventDefault();
  //    props.registerItem(newItem,  props.history); 
    };
    const checkAdmin = e => {
      console.log("hello");
      console.log(state.username);
      if(state.username === "JeevanJyotSingh@gmail.com" && state.password === "meisnoob")
        history.push("/admindashboard");
      else alert("Invalid username or password");
    };
  
    return (
      <div class="wrapper fadeInDown">
        
  <div id="formContent">
    {/* <!-- Tabs Titles --> */}

    {/* <!-- Icon --> */}
    <div class="fadeIn first">
      <h1 style={{color:"black"}}>Admin Login</h1>
      <img
        src="https://image.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg"
        id="icon"
        alt="User Icon"
      />
    </div>

    {/* <!-- Login Form --> */}
    <form noValidate onSubmit={ onSubmit }>
      <input
        style={{textAlign:"center",color:"black"}}
        onChange={ onChange }
        value={ state.username }
        type="text"
        id="username"
        class="fadeIn second"
        name="username"
        placeholder="email"
      />
      <input
        style={{textAlign:"center",color:"black"}}
        onChange={ onChange }
        value={ state.password }
        type="password"
        id="password"
        class="fadeIn third"
        name="password"
        placeholder="password"
      />
      <input type="submit" class="fadeIn fourth" value="Log In" onClick={checkAdmin} />
    </form>

    
  </div>
</div>
    );

  }

export default AdminLogin;