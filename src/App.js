import React, { Component } from "react";
import Post from "./components/Post/Post";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Form/Login/Login";
import SignUp from "./components/Form/Signup/Signup";
export class App extends Component {
  render() {
    const privateRoutes = (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
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
