import React, { Component } from "react";
import classes from "../Form.module.css";
import * as authActions from "../../../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Compressor from "compressorjs";
import Loading from "../../Loading/Loading";
import Message from "../../Message/Message";
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
    compressedPhoto: null,
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
      new Compressor(e.target.files[0], {
        quality: 0.8,
        maxWidth: 260,
        maxHeight: 260, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          this.setState({
            compressedPhoto: compressedResult,
            photo: e.target.files[0],
          });
        },
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

    return this.props.loading ? (
      <Loading />
    ) : (
      <>
        <div className={classes.FormWrap}>
          <form className={classes.Form}>
            <h1> 𝕤ί𝕘ⓝ𝕦ｐ👤</h1>
            <p
              style={{ display: this.state.showNameWarning ? "block" : "none" }}
              className={classes.Warning}
            >
              𝖓𝖆𝖒𝖊 𝖎𝖘 𝖗𝖊𝖖𝖚𝖎𝖗𝖊𝖉
            </p>
            <div className={nameError}>
              <input
                onChange={this.onChangeHandler}
                type="text"
                placeholder="Username"
                name="name"
                spellCheck={false}
                value={this.state.name}
                autoComplete="off"
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
              style={{
                display: this.state.showEmailWarning ? "block" : "none",
              }}
              className={classes.Warning}
            >
              𝖊𝖓𝖙𝖊𝖗 𝖈𝖔𝖗𝖗𝖊𝖈𝖙 𝖊𝖒𝖆𝖎𝖑
            </p>
            <div className={emailError}>
              <input
                onChange={this.onChangeHandler}
                type="text"
                placeholder="Email"
                name="email"
                spellCheck={false}
                value={this.state.email}
                autoComplete="off"
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
              𝖕𝖆𝖘𝖘𝖜𝖔𝖗𝖉 𝖘𝖍𝖔𝖚𝖑𝖉 𝖈𝖔𝖓𝖙𝖆𝖎𝖓 𝖒𝖎𝖓𝖎𝖒𝖚𝖒 𝖔𝖋 8 𝖈𝖍𝖆𝖗𝖆𝖈𝖙𝖊𝖗𝖘,1
              𝖚𝖕𝖕𝖊𝖗𝖈𝖆𝖘𝖊,𝖑𝖔𝖜𝖊𝖗𝖈𝖆𝖘𝖊,1 𝖓𝖚𝖒𝖇𝖊𝖗 𝖆𝖓𝖉 1 𝖘𝖕𝖊𝖈𝖎𝖆𝖑 𝖈𝖍𝖆𝖗𝖆𝖈𝖙𝖊𝖗
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
              <button
                disabled={this.state.disable}
                onClick={this.onClickHandler}
              >
                SignUp
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </>
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
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (details) => dispatch(authActions.signup(details)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
