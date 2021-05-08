import React, { Component } from "react";
import classes from "../Form.module.css";
import * as authActions from "../../../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Login extends Component {
  state = {
    email: "",
    password: "",
    disable: true,
  };
  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onClickHandler = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };
  render() {
    return (
      <div className={classes.FormWrap}>
        <form className={classes.Form}>
          <h1>Welcome</h1>

          <div>
            <input
              onChange={this.onChangeHandler}
              type="text"
              placeholder="Email"
              name="email"
              value={this.state.email}
            />
          </div>
          <div>
            <input
              onChange={this.onChangeHandler}
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
            />
          </div>

          <div>
            <button disabled={this.state.disable} onClick={this.onClickHandler}>
              LOGIN
            </button>
          </div>
          <p>
            don't have account? <Link to="/signup">sign up</Link>
          </p>
        </form>
      </div>
    );
  }
  componentDidUpdate(preProps, preState) {
    if (
      this.state.email != preState.email ||
      this.state.password != preState.password
    ) {
      if (
        this.state.email.trim().length > 0 &&
        this.state.password.trim().length > 0
      ) {
        this.setState({ disable: false });
      } else {
        this.setState({ disable: true });
      }
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (details) => dispatch(authActions.login(details)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
