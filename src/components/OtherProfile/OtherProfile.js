import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./OtherProfile.module.css";
import * as authActions from "../../actions/auth";
import { Redirect } from "react-router-dom";
import Model from "../Model/Model";
import People from "../People/People";
import axios from "axios";
class OtherProfile extends Component {
  state = {
    posts: [],
    postslength: 0,
    firstVisit: false,
    user: this.props.location.user,
  };
  onFollowHandler = async (following_id) => {
    await this.props.follow(following_id);
    this.setState({ firstVisit: false });
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
        firstVisit: true,
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
      if (this.props.location.user) {
        const res = await axios.get(`/user/${this.props.location.user._id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        this.setState({
          posts: res.data.userPosts,
          postslength: res.data.postsLength,
          user: res.data.user,
          firstVisit: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidUpdate() {
    if (this.props.location.user) {
      try {
        if (this.state.user) {
          const res = await axios.get(`/user/${this.props.location.user._id}`, {
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
    this.props.location.user = null;
  }
  render() {
    console.log(this.props.model, "MODEL");
    return !this.state.user ? (
      <Redirect to="/" />
    ) : this.props.model ? (
      <Model>
        <People userId={this.state.user._id} people={this.props.people} />
      </Model>
    ) : (
      <div className={classes.User}>
        {" "}
        <div className={classes.UserProfile}>
          <div className={classes.Left}>
            <img src={this.state.user.avatar.url} />
          </div>
          <div className={classes.Right}>
            <h1>{this.state.user.name}</h1>
            <p style={{ marginBottom: "10px" }}>{this.state.user.email}</p>
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
              {this.props.user.following.includes(
                this.state.user._id.toString()
              ) ? (
                <>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props.modelOpen("following")}
                  >
                    <span>{this.state.user.following.length - 1}</span>Following
                  </p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props.modelOpen("followers")}
                  >
                    <span>{this.state.user.followers.length}</span>Followers
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span>{this.state.user.following.length - 1}</span>Following
                  </p>
                  <p>
                    <span>{this.state.user.followers.length}</span>Followers
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={classes.UserDataMobile}>
          <p>
            <span>{this.state.postslength}</span>Posts
          </p>
          {this.props.user.following.includes(
            this.state.user._id.toString()
          ) ? (
            <>
              <p onClick={() => this.props.modelOpen("following")}>
                <span>{this.state.user.following.length - 1}</span>Following
              </p>
              <p onClick={() => this.props.modelOpen("followers")}>
                <span>{this.state.user.followers.length}</span>Followers
              </p>
            </>
          ) : (
            <>
              <p>
                <span>{this.state.user.following.length - 1}</span>Following
              </p>
              <p>
                <span>{this.state.user.followers.length}</span>Followers
              </p>
            </>
          )}
        </div>
        {this.props.user.following.includes(this.state.user._id.toString()) ? (
          this.state.posts.length == 0 && this.state.firstVisit ? (
            <h1 className="Info">No posts associated with this account</h1>
          ) : (
            <div className={classes.UserPosts}>
              {this.state.posts.map((post) => (
                <div key={post._id}>
                  <img src={post.photo.url} />
                </div>
              ))}
            </div>
          )
        ) : (
          <h1 className={classes.Show}>Follow to View Posts</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    people: state.model.people,
    model: state.model.model,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => dispatch(authActions.follow(userId)),
    unfollow: (userId) => dispatch(authActions.unfollow(userId)),
    modelOpen: (people) => dispatch({ type: "MODEL_OPEN", people }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
