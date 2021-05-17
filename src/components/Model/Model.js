import React, { Component } from "react";
import classes from "./Model.module.css";
import { connect } from "react-redux";
class Model extends Component {
  render() {
    return (
      <main>
        <div className={classes.Model} onClick={this.props.modelClose}></div>
        <div className={classes.ModelCenter}>{this.props.children}</div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modelClose: () => dispatch({ type: "MODEL_CLOSE" }),
  };
};
export default connect(null, mapDispatchToProps)(Model);
