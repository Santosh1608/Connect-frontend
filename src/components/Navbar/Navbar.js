import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Navbar.module.css";
import * as authActions from "../../actions/auth";
class Navbar extends Component {
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="container">
          <NavLink to="/" exact>
            <h2>ℂ𝕠𝕟𝕟𝕖𝕔𝕥</h2>
          </NavLink>
          <ul>
            <NavLink exact to="/post">
              <i className="fas fa-plus-circle"></i>
            </NavLink>
            <NavLink exact to="/search">
              <i className="fas fa-search"></i>
            </NavLink>
            <NavLink exact to="/profile">
              <img src={this.props.user.avatar.url} />
            </NavLink>
          </ul>
        </div>
      </nav>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logout()),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
