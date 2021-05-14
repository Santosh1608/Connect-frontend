import React, { Component } from "react";
import * as authActions from "../../actions/auth";
import { connect } from "react-redux";
import classes from "./Edit.module.css";
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
  render() {
    return (
      <div className={classes.Wrap}>
        <div className={classes.Left}>
          <img src={this.props.user.avatar.url} />
          <div>
            <button>Update Pic</button>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (email, name, history) =>
      dispatch(authActions.updateUser(email, name, history)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
