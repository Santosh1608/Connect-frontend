import React, { Component } from "react";
import classes from "../Form.module.css";
import * as authActions from "../../../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class SignUp extends Component {
  state = {
    name: "",
    nameError: true,
    nameChecked: false,
    email: "",
    emailError: true,
    emailChecked: false,
    password: "",
    passwordError: true,
    passwordChecked: false,
    photo: null,
    disable: true,
    showNameWarning: false,
    showEmailWarning: false,
    showPasswordWarning: false,
  };
  toggleWarningHandler = (e, type) => {
    this.setState((state) => {
      return { [type]: !state[type] };
    });
  };
  onChangeHandler = (e) => {
    if (e.target.name == "photo") {
      console.log(e.target.name);
      this.setState({
        [e.target.name]: e.target.files[0],
      });
    } else {
      let error = true;
      let disable = true;
      if (e.target.name === "name") {
        e.target.error = "nameError";
        e.target.check = "nameChecked";
        if (e.target.value.trim().length > 0) {
          error = false;
        }
      }
      if (e.target.name === "email") {
        e.target.error = "emailError";
        e.target.check = "emailChecked";
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(e.target.value)) {
          error = false;
        }
      }
      if (e.target.name === "password") {
        e.target.error = "passwordError";
        e.target.check = "passwordChecked";
        const pw = e.target.value;
        if (
          /[A-Z]/.test(pw) &&
          /[a-z]/.test(pw) &&
          /[0-9]/.test(pw) &&
          /[^A-Za-z0-9]/.test(pw) &&
          pw.length > 7
        ) {
          error = false;
        }
      }
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.error]: error,
        [e.target.check]: true,
      });
    }
  };
  onClickHandler = (e) => {
    e.preventDefault();
    this.props.signup(this.state);
  };

  render() {
    if (this.state.nameError && this.state.nameChecked) {
      var nameError = classes.nameError;
    }
    if (this.state.emailError && this.state.emailChecked) {
      var emailError = classes.emailError;
    }
    if (this.state.passwordError && this.state.passwordChecked) {
      var passwordError = classes.passwordError;
    }
    return (
      <div className={classes.FormWrap}>
        <form className={classes.Form}>
          <h1>Welcome</h1>
          <p
            style={{ display: this.state.showNameWarning ? "block" : "none" }}
            className={classes.Warning}
          >
            name is required
          </p>
          <div className={nameError}>
            <input
              onChange={this.onChangeHandler}
              type="text"
              placeholder="Username"
              name="name"
              spellCheck={false}
              value={this.state.name}
            />
            <span
              style={{
                fontSize: "1.3rem",
                color: "red",
                display: this.state.nameChecked ? "inline" : "none",
              }}
            >
              {this.state.nameError ? (
                <i
                  onClick={(e) =>
                    this.toggleWarningHandler(e, "showNameWarning")
                  }
                  class="fas fa-exclamation-circle"
                ></i>
              ) : (
                <i style={{ color: "green" }} class="fas fa-check-circle"></i>
              )}
            </span>
          </div>
          <p
            style={{ display: this.state.showEmailWarning ? "block" : "none" }}
            className={classes.Warning}
          >
            Enter correct email
          </p>
          <div className={emailError}>
            <input
              onChange={this.onChangeHandler}
              type="text"
              placeholder="Email"
              name="email"
              spellCheck={false}
              value={this.state.email}
            />
            <span
              style={{
                fontSize: "1.3rem",
                color: "red",
                display: this.state.emailChecked ? "inline" : "none",
              }}
            >
              {this.state.emailError ? (
                <i
                  onClick={(e) =>
                    this.toggleWarningHandler(e, "showEmailWarning")
                  }
                  class="fas fa-exclamation-circle"
                ></i>
              ) : (
                <i style={{ color: "green" }} class="fas fa-check-circle"></i>
              )}
            </span>
          </div>
          <p
            style={{
              display: this.state.showPasswordWarning ? "block" : "none",
            }}
            className={classes.Warning}
          >
            password should contain minimum of 8 characters,1 uppercase,1
            lowercase,1 number and 1 special character
          </p>
          <div className={passwordError}>
            <input
              onChange={this.onChangeHandler}
              type="password"
              placeholder="Password"
              name="password"
              spellCheck={false}
              value={this.state.password}
            />
            <span
              style={{
                fontSize: "1.3rem",
                color: "red",
                display: this.state.passwordChecked ? "inline" : "none",
              }}
            >
              {this.state.passwordError ? (
                <i
                  onClick={(e) =>
                    this.toggleWarningHandler(e, "showPasswordWarning")
                  }
                  class="fas fa-exclamation-circle"
                ></i>
              ) : (
                <i style={{ color: "green" }} class="fas fa-check-circle"></i>
              )}
            </span>
          </div>
          <div>
            <input onChange={this.onChangeHandler} type="file" name="photo" />
          </div>
          <div>
            <button disabled={this.state.disable} onClick={this.onClickHandler}>
              SignUp
            </button>
          </div>
          <p>
            already have an account? <Link to="/login">login</Link>
          </p>
        </form>
      </div>
    );
  }
  componentDidUpdate(preProps, preState) {
    if (
      preState.nameError != this.state.nameError ||
      preState.emailError != this.state.emailError ||
      preState.passwordError != this.state.passwordError
    ) {
      if (!this.state.nameError) {
        this.setState({
          showNameWarning: false,
        });
      }
      if (!this.state.emailError) {
        this.setState({
          showEmailWarning: false,
        });
      }
      if (!this.state.passwordError) {
        this.setState({
          showPasswordWarning: false,
        });
      }
      if (
        !this.state.nameError &&
        !this.state.emailError &&
        !this.state.passwordError
      ) {
        this.setState({
          disable: false,
        });
      } else {
        this.setState({ disable: true });
      }
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (details) => dispatch(authActions.signup(details)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
