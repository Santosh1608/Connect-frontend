import axios from "axios";
import React, { Component } from "react";
import classes from "./PostMore.module.css";
import { connect } from "react-redux";

class PostMore extends Component {
  state = {
    post: null,
  };
  async componentDidMount() {
    try {
      const res = await axios.get(`/post/${this.props.postId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      let comments = res.data.comments.map((comment) => {
        comment.updateDisabled = true;
        comment.postDisabled = true;
        return comment;
      });
      res.data.comments = comments;

      this.setState({ post: res.data });
    } catch (e) {
      console.log(e);
    }
  }
  onDeleteHandler = async (postId, commentId) => {
    try {
      let deleteCommentId = await axios.delete(
        `/post/comment/${postId}/${commentId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      let post = { ...this.state.post };
      let comments = [...this.state.post.comments];
      console.log(comments);
      console.log(deleteCommentId);
      console.log(commentId);
      comments = comments.filter(
        (comment) => comment._id.toString() != deleteCommentId.data
      );
      console.log("COMMENT");
      console.log(comments);
      post.comments = comments;
      this.setState({ post: post });
    } catch (e) {
      console.log(e);
    }
  };
  onEditHandler = (e, commentId) => {
    const post = { ...this.state.post };
    const comments = [...post.comments];
    const commentIndex = comments.findIndex(
      (comment) => comment._id == commentId
    );
    comments[commentIndex].updateDisabled = false;
    comments[commentIndex].postDisabled = false;
    post.comments = comments;
    this.setState({ post: post });
  };
  onChangeHandler = (e, commentId) => {
    const post = { ...this.state.post };
    const comments = [...post.comments];
    const commentIndex = comments.findIndex(
      (comment) => comment._id == commentId
    );
    comments[commentIndex].comment = e.target.value;
    if (e.target.value.trim().length == 0) {
      comments[commentIndex].postDisabled = true;
    } else {
      comments[commentIndex].postDisabled = false;
    }
    post.comments = comments;
    this.setState({ post: post });
  };
  onUpdateHandler = async (e, postId, commentId) => {
    try {
      const post = { ...this.state.post };
      const comments = [...post.comments];
      const commentIndex = comments.findIndex(
        (comment) => comment._id == commentId
      );
      comments[commentIndex].postDisabled = true;
      comments[commentIndex].updateDisabled = true;
      post.comments = comments;
      await axios.put(
        `/post/comment/${postId}/${commentId}`,
        {
          comment: comments[commentIndex].comment,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      this.setState({ post: post });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const Inputclasses = [classes.Input];

    return (
      this.state.post && (
        <div className={classes.PostMore}>
          <div className={classes.Left}>
            <img src={this.state.post.photo.url} />
          </div>
          <div className={classes.Right}>
            <div className={classes.Wrap}>
              {this.props.show == "likes" ? (
                <p className={classes.Title}>Liked by</p>
              ) : (
                <p className={classes.Title}>Comments</p>
              )}

              {this.props.show == "likes"
                ? this.state.post.likes.map((like) => (
                    <div className={classes.WrapComment}>
                      <div className={classes.LikeName}>
                        <img src={like.avatar.url} />
                        <h4>{like.name}</h4>
                      </div>
                    </div>
                  ))
                : this.state.post.comments.map((comment) => (
                    <div className={classes.WrapComment}>
                      <div>
                        {comment.updateDisabled ? (
                          <p>{comment.comment}</p>
                        ) : (
                          <input
                            className={classes.Input}
                            style={{
                              borderBottom: !comment.updateDisabled
                                ? "2px solid #dde3dc"
                                : "none",
                            }}
                            type="text"
                            disabled={comment.updateDisabled}
                            value={comment.comment}
                            onChange={(e) =>
                              this.onChangeHandler(e, comment._id)
                            }
                          />
                        )}

                        {this.props.user._id == comment.comment_by._id ? (
                          <div className={classes.Icons}>
                            <i
                              onClick={(e) =>
                                this.onEditHandler(e, comment._id)
                              }
                              class="far fa-edit"
                            ></i>
                            <i
                              className={classes.Delete}
                              onClick={() =>
                                this.onDeleteHandler(
                                  this.props.postId,
                                  comment._id
                                )
                              }
                              class="fas fa-trash"
                            ></i>
                            <button
                              className={classes.Update}
                              onClick={(e) =>
                                this.onUpdateHandler(
                                  e,
                                  this.props.postId,
                                  comment._id
                                )
                              }
                              disabled={comment.postDisabled}
                            >
                              UPDATE
                            </button>
                          </div>
                        ) : null}
                      </div>
                      <div className={classes.Name}>
                        <img src={comment.comment_by.avatar.url} />
                        <h4>{comment.comment_by.name}</h4>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(PostMore);
