import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./OtherProfile.module.css";
import * as authActions from "../../actions/auth";
import { Redirect } from "react-router-dom";
import axios from "axios";
class OtherProfile extends Component {
  state = {
    posts: [],
    postslength: 0,
    user: this.props.location.user,
  };
  onFollowHandler = async (following_id) => {
    await this.props.follow(following_id);
    try {
      const res = await axios.get(`/user/${this.state.user._id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      this.setState({
        posts: res.data.userPosts,
        postslength: res.data.postsLength,
        user: res.data.user,
      });
    } catch (e) {
      console.log(e);
    }
  };
  onUnFollowHandler = async (following_id) => {
    await this.props.unfollow(following_id);
    try {
      const res = await axios.get(`/user/${this.state.user._id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      this.setState({
        posts: res.data.userPosts,
        postslength: res.data.postsLength,
        user: res.data.user,
      });
    } catch (e) {
      console.log(e);
    }
  };
  async componentDidMount() {
    try {
      if (this.state.user) {
        const res = await axios.get(`/user/${this.state.user._id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        this.setState({
          posts: res.data.userPosts,
          postslength: res.data.postsLength,
          user: res.data.user,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return !this.state.user ? (
      <Redirect to="/" />
    ) : (
      <div className={classes.User}>
        {" "}
        <div className={classes.UserProfile}>
          <div className={classes.Left}>
            <img src={this.state.user.avatar.url} />
          </div>
          <div className={classes.Right}>
            <h1>{this.state.user.name}</h1>
            <div className={classes.Icons}>
              <div>
                {this.props.user.following.includes(
                  this.state.user._id.toString()
                ) ? (
                  <span
                    onClick={() => this.onUnFollowHandler(this.state.user._id)}
                    className={classes.UnFollow}
                  >
                    Unfollow
                  </span>
                ) : (
                  <span
                    onClick={() => this.onFollowHandler(this.state.user._id)}
                    className={classes.Follow}
                  >
                    Follow
                  </span>
                )}
              </div>
            </div>
            <div className={classes.UserData}>
              <p>
                <span>{this.state.postslength}</span>Posts
              </p>
              <p>
                <span>{this.state.user.following.length - 1}</span>Following
              </p>
              <p>
                <span>{this.state.user.followers.length}</span>Followers
              </p>
            </div>
          </div>
        </div>
        <div className={classes.UserDataMobile}>
          <p>
            <span>{this.state.posts.length}</span>Posts
          </p>
          <p>
            <span>{this.state.user.following.length}</span>Following
          </p>
          <p>
            <span>{this.state.user.followers.length}</span>Followers
          </p>
        </div>
        {this.props.user.following.includes(this.state.user._id.toString()) ? (
          <div className={classes.UserPosts}>
            {this.state.posts.map((post) => (
              <div key={post._id}>
                <img src={post.photo.url} />
              </div>
            ))}
          </div>
        ) : (
          <h1>Follow to View Posts</h1>
        )}
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
    unfollow: (userId) => dispatch(authActions.unfollow(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
