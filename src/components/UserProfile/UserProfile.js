import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./UserProfile.module.css";
import * as authActions from "../../actions/auth";
class UserProfile extends Component {
  render() {
    return (
      <div className={classes.UserProfile}>
        <img src={this.props.user.avatar.url} />
        <Link onClick={this.props.logout} to="#">
          logout
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
