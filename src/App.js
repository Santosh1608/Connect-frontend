import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Form/Login/Login";
import SignUp from "./components/Form/Signup/Signup";
import UserProfile from "./components/UserProfile/UserProfile";
import Post from "./components/Post/Post";
import Search from "./components/Search/Search";
import OtherProfile from "./components/OtherProfile/OtherProfile";
export class App extends Component {
  render() {
    const privateRoutes = (
      <div className="App">
        <Navbar />
        <div className="Main"> </div>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={UserProfile} />
            <Route path="/profile/:id" exact component={OtherProfile} />
            <Route path="/post" exact component={Post} />
            <Route path="/search" exact component={Search} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
    const publicRoutes = (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Redirect to="/login" />
      </Switch>
    );
    const routes = this.props.token ? privateRoutes : publicRoutes;

    return routes;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(App);
