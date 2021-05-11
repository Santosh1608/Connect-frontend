import React, { Component } from "react";
import classes from "./Search.module.css";
import * as authActions from "../../actions/auth";
import axios from "axios";
import { connect } from "react-redux";
class Search extends Component {
  state = {
    users: [],
  };
  onFollowHandler = (following_id) => {
    this.props.follow(following_id);
  };
  onChangeHandler = async (e) => {
    try {
      if (e.target.value.trim().length == 0) {
        this.setState({ users: [] });
        return;
      }
      const res = await axios.get(`/users/find/${e.target.value}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      this.setState({ users: res.data });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <div className={classes.Wrap}>
        <div className={classes.Search}>
          <input
            onChange={this.onChangeHandler}
            type="text"
            placeholder="Search for users"
          />
        </div>
        <div className={classes.Users}>
          {this.state.users.map((user) => {
            return this.props.user._id.toString() == user._id ? null : (
              <div className={classes.User}>
                <div>
                  <img src={user.avatar.url} />
                  <p>{user.name[0].toUpperCase() + user.name.slice(1)}</p>
                </div>
                <div>
                  <button
                    onClick={() => this.onFollowHandler(user._id)}
                    disabled={this.props.user.following.includes(
                      user._id.toString()
                    )}
                  >
                    {this.props.user.following.includes(user._id.toString())
                      ? "following"
                      : "follow"}
                  </button>
                </div>
              </div>
            );
          })}
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
    follow: (userId) => dispatch(authActions.follow(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
