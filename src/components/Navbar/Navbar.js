import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as authActions from "../../actions/auth";
class Navbar extends Component {
  render() {
    return (
      <div>
        NAVBAR
        <NavLink exact to="/signout" onClick={this.props.logout}>
          SignOut
        </NavLink>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(Navbar);
