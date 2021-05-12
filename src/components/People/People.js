import axios from "axios";
import React, { Component } from "react";
import classes from "./People.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
export class People extends Component {
  state = {
    people: [],
  };
  async componentDidMount() {
    try {
      const res = await axios.get(
        `/user/${this.props.people}/${this.props.userId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      if (this.props.people == "following") {
        this.setState({ people: res.data.following });
      } else {
        this.setState({ people: res.data.followers });
      }
    } catch (e) {
      console.log(e);
    }
  }
  onClickHandler = (user) => {
    console.log("CLICK", this.props, user);
    this.props.modelClose();
    console.log(this.props.user._id.toString(), user._id);
    if (this.props.user._id.toString() != user._id) {
      this.props.history.replace({
        pathname: `/profile/${user._id}`,
        user: user,
      });
    } else {
      this.props.history.replace("/profile");
    }
  };
  render() {
    console.log("PEOPLE");
    return (
      <div className={classes.People}>
        <h4>{this.props.people}</h4>
        {this.state.people.map((user) => (
          <div
            onClick={() => this.onClickHandler(user)}
            className={classes.SinglePeople}
            key={user._id}
          >
            <img src={user.avatar.url} />
            <span>{user.name}</span>
          </div>
        ))}
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
    modelOpen: (people) => dispatch({ type: "MODEL_OPEN", people }),
    modelClose: () => dispatch({ type: "MODEL_CLOSE" }),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(People));
