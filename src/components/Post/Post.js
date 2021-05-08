import React, { Component } from "react";
import axios from "axios";
class Post extends Component {
  state = {
    title: "",
    photo: null,
  };
  onChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.name == "photo") {
      console.log(e.target.name);
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
      console.log("Sending");
      const url = "http://localhost:8080/api/post/60929bbad1dae7f0a6900aa9";
      const formData = new FormData();
      formData.append("photo", this.state.photo);
      formData.append("title", "Nice image");
      axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response.data);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };
  render() {
    return (
      <div>
        <input type="text" name="title" onChange={this.onChange} />
        <input type="file" name="photo" onChange={this.onChange} />
        <button type="submit" onClick={this.onClick}>
          Upload
        </button>
      </div>
    );
  }
}

export default Post;
