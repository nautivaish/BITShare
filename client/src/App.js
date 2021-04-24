import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Lendpage from "./components/Lend/Lendpage";
import AddItem from "./components/Lend/AddItem";
import Borrowpage from "./components/Borrow/Borrowpage";
import Borrowitempage from "./components/Borrow/Borrowitempage";
import Itemdetails from "./components/Borrow/Itemdetails";
import Profilepage from "./components/Misc/Profilepage";
import MyFavouriteItems from "./components/Misc/MyFavouriteItems"; 
import RequestedItems from "./components/Borrow/RequestedItems";
import BorrowedItems from "./components/Borrow/BorrowedItems";
import PreviousItems from "./components/Borrow/PreviousItems";
import Requests from "./components/Request portal/Requests";
import MyRequests from "./components/Request portal/MyRequests";
import "./App.css";
import CheckStatus from "./components/Request portal/CheckStatus";
import AdminLogin from "./components/auth/AdminLogin";
const TheLayout = React.lazy(() => import('./coreui-dashboard/src/containers/TheLayout'));
// import TheLayout from './coreui-dashboard/src/containers/TheLayout';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            
            <Route exact path="/" component={Landing} />
            <Route exact path="/adminlogin" component={AdminLogin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            
            
            <React.Suspense fallback={loading}>
              <Route exact path="/admindashboard" component={TheLayout} />
            </React.Suspense>

            <Switch>

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/lendpage" component={Lendpage} />
              <PrivateRoute exact path="/borrowpage" component={Borrowpage} />
              <PrivateRoute exact path="/borrowpage/:id" component={Borrowitempage} />
              <PrivateRoute exact path="/additem" component={AddItem} />
              <PrivateRoute exact path="/profilepage/:id" component={Profilepage}/>
              <PrivateRoute exact path="/myfavouriteitems" component={MyFavouriteItems} />
              <PrivateRoute exact path="/requesteditems" component={RequestedItems} />
              <PrivateRoute exact path="/borroweditems" component={BorrowedItems} />
              <PrivateRoute exact path="/previousitems" component={PreviousItems} />
              <PrivateRoute exact path="/requests" component={Requests} />
              <PrivateRoute exact path="/myrequests" component={MyRequests} />
              <PrivateRoute exact path="/checkstatus/:request" component={CheckStatus} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;


