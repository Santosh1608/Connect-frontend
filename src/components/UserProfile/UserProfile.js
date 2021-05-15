import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./UserProfile.module.css";
import * as authActions from "../../actions/auth";
import Model from "../../components/Model/Model";
import People from "../../components/People/People";
import axios from "axios";
import user_edit from "../../assets/edit_user.svg";
class UserProfile extends Component {
  state = {
    posts: [],
    postslength: null,
    firstVisit: false,
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
        firstVisit: true,
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    console.log("LENGTH", this.state.postslength);
    return this.props.model ? (
      <Model>
        <People userId={this.props.user._id} people={this.props.people} />
      </Model>
    ) : (
      <div className={classes.User}>
        <div className={classes.UserProfile}>
          <div className={classes.Left}>
            <img src={this.props.user.avatar.url} />
          </div>
          <div className={classes.Right}>
            <h1>{this.props.user.name}</h1>
            <div className={classes.Icons}>
              <div
                onClick={() => this.props.history.push("/profile/edit")}
                className={classes.Icon}
              >
                <img className={classes.Edit_Icon} src={user_edit} />
                <span className={classes.Edit}>Edit</span>
              </div>
              <div className={classes.Icon} onClick={this.props.logout}>
                <i class="fas fa-sign-out-alt"></i>
                <span className={classes.Logout}>Logout</span>
              </div>
            </div>
            <div className={classes.UserData}>
              <p>
                <span>{this.state.postslength}</span>Posts
              </p>
              <p
                onClick={() => this.props.modelOpen("following")}
                className={classes.Following}
              >
                <span>{this.props.user.following.length - 1}</span>
                Following
              </p>
              <p
                onClick={() => this.props.modelOpen("followers")}
                className={classes.Followers}
              >
                <span>{this.props.user.followers.length}</span>
                Followers
              </p>
            </div>
          </div>
        </div>
        <div className={classes.UserDataMobile}>
          <p>
            <span>{this.state.postslength}</span>Posts
          </p>
          <p onClick={() => this.props.modelOpen("following")}>
            <span>{this.props.user.following.length}</span>Following
          </p>
          <p onClick={() => this.props.modelOpen("followers")}>
            <span>{this.props.user.followers.length}</span>Followers
          </p>
        </div>
        {this.state.posts.length == 0 && this.state.firstVisit ? (
          <h1 className="Info">U have no posts to view</h1>
        ) : (
          <div className={classes.UserPosts}>
            {this.state.posts.map((post) => (
              <div key={post._id}>
                <img src={post.photo.url} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    model: state.model.model,
    people: state.model.people,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logout()),
    modelOpen: (people) => dispatch({ type: "MODEL_OPEN", people }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
