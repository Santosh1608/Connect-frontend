import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Waypoint } from "react-waypoint";
import classes from "./Home.module.css";
import Model from "../Model/Model";
import PostMore from "../PostMore/PostMore";
class Home extends Component {
  state = {
    posts: [],
    page: 1,
    hasNextPage: true,
    ITEMS_PER_PAGE: 6,
    firstVisit: false,
  };
  show = "";
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(preProps, preState) {
    console.log(preProps.model, this.props.model);
    if (preProps.model != this.props.model) {
      console.log("HIT");
      this.getData(true);
    }
  }
  onChangeHandler = (e, id) => {
    let postIndex, post;
    let posts = [...this.state.posts];
    postIndex = this.state.posts.findIndex((post) => post._id == id);
    post = posts[postIndex];
    if (e.target.value.length > 0) {
      post.commentDisabled = false;
      this.setState({ commentDisabled: false });
    } else {
      post.commentDisabled = true;
      this.setState({ commentDisabled: true });
    }
    post.commentValue = e.target.value;
    posts[postIndex] = post;

    this.setState({ posts: posts });
  };
  onCommentHandler = async (postId) => {
    let post = this.state.posts.find((post) => post._id == postId);
    try {
      const res = await axios.post(
        `/post/comment/${postId}`,
        {
          comment: post.commentValue,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      let Posts = [...this.state.posts];
      const PostIndex = Posts.findIndex((post) => post._id == postId);
      Posts[PostIndex].comments = res.data.comments;
      Posts[PostIndex].commentValue = "";
      Posts[PostIndex].commentDisabled = true;
      this.setState({ posts: Posts, comment: "", commentDisabled: true });
    } catch (e) {
      console.log(e);
    }
  };
  onToggleLikeHandler = async (postId, flag) => {
    try {
      const res = await axios.post(
        `/post/${flag}/${postId}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      let Posts = [...this.state.posts];
      const PostIndex = Posts.findIndex((post) => post._id == postId);
      console.log(PostIndex);
      Posts[PostIndex].likes = res.data.likes;
      console.log(Posts);
      this.setState({ posts: Posts });
    } catch (e) {
      console.log(e);
    }
  };
  showMore = (show, postId) => {
    this.show = <PostMore show={show} postId={postId} />;
    this.props.modelOpen();
  };
  getData = async (initial) => {
    console.log(initial, "INITIAL");
    if (!this.state.hasNextPage && !initial) return;

    let searchPostURL = `/posts?page=${this.state.page}&limit=${this.state.ITEMS_PER_PAGE}`;
    if (initial) {
      searchPostURL = `/posts?page=${1}&limit=${this.state.ITEMS_PER_PAGE}`;
      this.setState({ hasNextPage: true });
    }
    console.log(searchPostURL);
    axios
      .get(searchPostURL, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data: { docs, total } }) => {
        if (docs) {
          if (total === this.state.posts.length + docs.length && !initial) {
            this.setState({ hasNextPage: false });
          }
          console.log("---------POSTS-----------");
          console.log(docs);
          docs = docs.map((post) => {
            post.commentValue = "";
            post.commentDisabled = true;
            return post;
          });
          if (!initial) {
            this.setState((preState) => {
              return {
                posts: [...preState.posts, ...docs],
                page: preState.page + 1,
              };
            });
          } else {
            console.log(initial, ")))))))))))))))))))))))))))0");

            this.setState({
              posts: [...docs],
              page: 2,
            });
          }
          this.setState({ firstVisit: true });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  loadMoreData = () => {
    if (this.state.page > 1) {
      this.getData();
    }
  };
  onDeleteHandler = async (postId) => {
    if (window.confirm("Are u sure to delete?")) {
      try {
        await axios.delete(`/post/${postId}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        this.props.addSuccess();
        setTimeout(() => {
          this.props.removeSuccess();
        }, 3000);
        this.getData(true);
      } catch (e) {
        console.log(e);
        this.props.error();
      }
    } else {
      console.log("NOT DELETE");
    }
  };
  render() {
    console.log(this.show);
    return this.props.model ? (
      <Model>{this.show}</Model>
    ) : this.state.posts.length == 0 && this.state.firstVisit ? (
      <h1 className="Info">Follow Others To view their posts</h1>
    ) : (
      <div>
        <div className={classes.Wrapper}>
          {this.state.posts.map((post) => (
            <div class={classes.card}>
              <div
                onClick={() =>
                  post.post_by._id == this.props.user._id
                    ? this.props.history.push({
                        pathname: `/profile`,
                      })
                    : this.props.history.push({
                        pathname: `/profile/${post.post_by._id}`,
                        user: post.post_by,
                      })
                }
                className={classes.cardTop}
              >
                <img src={post.post_by.avatar.url} />
                <span>{post.post_by.name}</span>
              </div>
              <img
                src={post.photo.url}
                alt="Picture"
                style={{ width: "100%" }}
              />

              <div className={classes.cardBottom}>
                {post.likes.includes(this.props.user._id.toString()) ? (
                  <i
                    onClick={() => this.onToggleLikeHandler(post._id, "unlike")}
                    class="fas fa-heart"
                  ></i>
                ) : (
                  <i
                    onClick={() => this.onToggleLikeHandler(post._id, "like")}
                    class="far fa-heart"
                  ></i>
                )}
                <i
                  onClick={() => this.showMore("comments", post._id)}
                  class="far fa-comment"
                ></i>
                {post.post_by._id.toString() == this.props.user._id && (
                  <i
                    onClick={() => this.onDeleteHandler(post._id)}
                    class="fas fa-trash DeletePic"
                  ></i>
                )}
                <p
                  onClick={() => this.showMore("likes", post._id)}
                  className={classes.ViewLikes}
                >
                  <b>{post.likes.length} </b>
                  {post.likes.length > 1 ? "likes" : "like"}
                </p>
                <p>
                  <b>{post.title && post.post_by.name} </b>
                  {post.title}
                </p>
                <p
                  onClick={() => this.showMore("comments", post._id)}
                  className={classes.ViewComment}
                >
                  {post.comments.length > 0
                    ? post.comments.length > 1
                      ? `View ${post.comments.length} comments`
                      : `View ${post.comments.length} comment`
                    : "No comments"}
                </p>
              </div>

              <div className={classes.Comment}>
                <input
                  onChange={(e) => this.onChangeHandler(e, post._id)}
                  type="text"
                  placeholder="Add a comment"
                  name="comment"
                  value={post.commentValue}
                />
                <button
                  disabled={post.commentDisabled}
                  onClick={() => this.onCommentHandler(post._id)}
                >
                  Post
                </button>
              </div>
            </div>
          ))}
        </div>
        {this.state.hasNextPage && (
          <Waypoint onEnter={this.loadMoreData}>
            <div style={{ textAlign: "center" }}>
              <i class="fa fa-spinner fa-2x" aria-hidden="true"></i>
            </div>
          </Waypoint>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
    model: state.model.model,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    modelOpen: (people) => dispatch({ type: "MODEL_OPEN", people }),
    addSuccess: () =>
      dispatch({ type: "SUCCESS", success: "Post deleted successfully" }),
    removeSuccess: () => dispatch({ type: "REMOVE_SUCCESS" }),
    error: (err) => dispatch({ type: "ERROR", error: err }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
