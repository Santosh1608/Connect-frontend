import React, { Component } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import classes from "./Post.module.css";
import { connect } from "react-redux";
import Compressor from "compressorjs";
class Post extends Component {
  state = {
    title: "",
    photo: null,
    loading: false,
    compressedPhoto: null,
  };
  onChange = (e) => {
    if (e.target.name == "photo") {
      console.log(e.target.name);
      const image = e.target.files[0];
      new Compressor(image, {
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 1000,
        // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          this.setState({ compressedPhoto: compressedResult });
        },
      });
      this.setState({
        [e.target.name]: e.target.files[0],
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  onClick = async (e) => {
    if (this.state.photo) {
      try {
        console.log("Sending");
        const formData = new FormData();
        formData.append("photo", this.state.compressedPhoto);
        formData.append("title", this.state.title);
        this.setState({ loading: true });
        await axios({
          method: "post",
          url: "/post",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        });
        this.setState({ loading: false });
        this.props.addSuccess();
        setTimeout(() => {
          this.props.removeSuccess();
        }, 3000);
        this.props.history.replace("/");
      } catch (e) {
        console.log(e);
        this.setState({ loading: false });
        this.props.error(e.response.data);
      }
    }
  };
  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <div className={classes.Post}>
        <input
          type="text"
          name="title"
          onChange={this.onChange}
          placeholder="enter description"
        />
        <input type="file" name="photo" onChange={this.onChange} />
        <button
          disabled={this.state.photo ? false : true}
          type="submit"
          onClick={this.onClick}
        >
          Upload
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    success: state.auth.successMsg,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addSuccess: () =>
      dispatch({ type: "SUCCESS", success: "Post added Successfully" }),
    removeSuccess: () => dispatch({ type: "REMOVE_SUCCESS" }),
    error: (err) => dispatch({ type: "ERROR", error: err }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
