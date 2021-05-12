import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./UserProfile.module.css";
import * as authActions from "../../actions/auth";
class UserProfile extends Component {
  render() {
    return (
      <div className={classes.User}>
        <div className={classes.UserProfile}>
          <div className={classes.Left}>
            <img src={this.props.user.avatar.url} />
          </div>
          <div className={classes.Right}>
            <h1>{this.props.user.name}</h1>
            <div className={classes.Icons}>
              <div>
                <i class="fas fa-edit"></i>
                <span className={classes.Edit}>Edit</span>
              </div>
              <div>
                <i class="far fa-trash-alt"></i>
                <span className={classes.Delete}>Delete Account</span>
              </div>
              <div>
                <i onClick={this.props.logout} class="fas fa-sign-out-alt"></i>
                <span className={classes.Logout}>Logout</span>
              </div>
            </div>
            <div className={classes.UserData}>
              <p>
                <span>10</span>Posts
              </p>
              <p>
                <span>100</span>Following
              </p>
              <p>
                <span>50</span>Followers
              </p>
            </div>
          </div>
        </div>
        <div className={classes.UserDataMobile}>
          <p>
            <span>10</span>Posts
          </p>
          <p>
            <span>100</span>Following
          </p>
          <p>
            <span>50</span>Followers
          </p>
        </div>
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
