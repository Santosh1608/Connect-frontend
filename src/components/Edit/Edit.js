import React, { Component } from "react";
import * as authActions from "../../actions/auth";
import { connect } from "react-redux";
import classes from "./Edit.module.css";
import Compressor from "compressorjs";
import Loading from "../Loading/Loading";
class Edit extends Component {
  state = {
    email: this.props.user.email,
    name: this.props.user.name,
    disabled: true,
  };
  onEditHandler = async () => {
    this.props.updateUser(
      this.state.email,
      this.state.name,
      this.props.history
    );
  };
  onChangeHandler = (e) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (e.target.name == "email") {
      if (
        e.target.value.trim().length <= 0 ||
        this.state.name.trim().length <= 0 ||
        !reg.test(e.target.value)
      ) {
        this.setState({ disabled: true });
      } else {
        this.setState({ disabled: false });
      }
    } else {
      if (
        e.target.value.trim().length <= 0 ||
        this.state.email.trim().length <= 0 ||
        !reg.test(this.state.email)
      ) {
        this.setState({ disabled: true });
      } else {
        this.setState({ disabled: false });
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  onChange = (e) => {
    console.log("CHANGED");
    const image = e.target.files[0];
    console.log(image);
    if (image) {
      new Compressor(image, {
        quality: 0.6,
        maxWidth: 260,
        maxHeight: 260, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          this.props.updateUserProfile(compressedResult, this.props.history);
        },
      });
    }
  };
  render() {
    return this.props.loading ? (
      <Loading />
    ) : (
      <div className={classes.Wrap}>
        <div className={classes.Left}>
          <img src={this.props.user.avatar.url} />
          <div>
            <label for="img">Update Pic</label>
            <input
              id="img"
              style={{ display: "none" }}
              type="file"
              name="photo"
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className={classes.Right}>
          <input
            name="email"
            spellCheck={false}
            type="text"
            value={this.state.email}
            onChange={this.onChangeHandler}
          />
          <input
            name="name"
            spellCheck={false}
            type="text"
            value={this.state.name}
            onChange={this.onChangeHandler}
          />
          <button disabled={this.state.disabled} onClick={this.onEditHandler}>
            Update Profile
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (email, name, history) =>
      dispatch(authActions.updateUser(email, name, history)),
    updateUserProfile: (photo, history) =>
      dispatch(authActions.updateUserProfile(photo, history)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
