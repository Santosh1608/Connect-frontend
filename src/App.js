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
import Edit from "./components/Edit/Edit";
import Message from "./components/Message/Message";
export class App extends Component {
  render() {
    let msg = null;
    if (this.props.error) {
      msg = <Message message={{ type: "error", value: this.props.errorMsg }} />;
    } else if (this.props.success) {
      msg = (
        <Message message={{ type: "success", value: this.props.success }} />
      );
    }
    console.log(this.props.user);
    const privateRoutes = (
      <div className="App">
        {msg}
        <Navbar />
        <div className="Main"> </div>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={UserProfile} />
            <Route path="/profile/edit" exact component={Edit} />
            <Route path="/profile/:id" exact component={OtherProfile} />
            <Route path="/post" exact component={Post} />
            <Route path="/search" exact component={Search} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
    const publicRoutes = (
      <>
        {msg}
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Redirect to="/login" />
        </Switch>
      </>
    );
    const routes = this.props.token ? privateRoutes : publicRoutes;

    return routes;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg,
    success: state.auth.successMsg,
  };
};

export default connect(mapStateToProps)(App);
