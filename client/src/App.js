import React, { Component } from "react";
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  // HashRouter,
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

import "./App.css";

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
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

// import React, { Component } from 'react';
// import { HashRouter, Route, Switch } from 'react-router-dom';
// // import './scss/style.scss';

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// )

// // Containers
// const TheLayout = React.lazy(() => import('./coreui-dashboard/src/containers/TheLayout'));

// // Pages
// // const Login = React.lazy(() => import('./views/pages/login/Login'));
// // const Register = React.lazy(() => import('./views/pages/register/Register'));
// // const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// // const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

// class App extends Component {

//   render() {
//     return (
//       <HashRouter>
//           <React.Suspense fallback={loading}>
//             <Switch>
//               {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
//               <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
//               <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
//               <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
//               <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
//             </Switch>
//           </React.Suspense>
//       </HashRouter>
//     );
//   }
// }

// export default App;
