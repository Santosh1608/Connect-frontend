import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./UserProfile.module.css";
import * as authActions from "../../actions/auth";
import axios from "axios";
class UserProfile extends Component {
  state = {
    posts: [],
    postslength: null,
  };
  async componentDidMount() {
    try {
      const res = await axios.get(`/user/${this.props.user._id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      this.setState({
        posts: res.data.userPosts,
        postslength: res.data.postsLength,
      });
    } catch (e) {
      console.log(e);
    }
  }
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
                <span>{this.state.postslength}</span>Posts
              </p>
              <p>
                <span>{this.props.user.following.length - 1}</span>Following
              </p>
              <p>
                <span>{this.props.user.followers.length}</span>Followers
              </p>
            </div>
          </div>
        </div>
        <div className={classes.UserDataMobile}>
          <p>
            <span>{this.state.posts.length}</span>Posts
          </p>
          <p>
            <span>{this.props.user.following.length}</span>Following
          </p>
          <p>
            <span>{this.props.user.followers.length}</span>Followers
          </p>
        </div>
        <div className={classes.UserPosts}>
          {this.state.posts.map((post) => (
            <div key={post._id}>
              <img src={post.photo.url} />
            </div>
          ))}
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
