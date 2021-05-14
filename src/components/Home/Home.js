import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Waypoint } from "react-waypoint";
import classes from "./Home.module.css";
class Home extends Component {
  state = {
    posts: [],
    page: 1,
    hasNextPage: true,
    ITEMS_PER_PAGE: 6,
  };
  componentDidMount() {
    this.getData();
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
  getData = async () => {
    if (!this.state.hasNextPage) return;

    const searchPostURL = `/posts?page=${this.state.page}&limit=${this.state.ITEMS_PER_PAGE}`;
    axios
      .get(searchPostURL, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data: { docs, total } }) => {
        if (docs) {
          if (total === this.state.posts.length + docs.length) {
            this.setState({ hasNextPage: false });
          }
          console.log("---------POSTS-----------");
          console.log(docs);
          docs = docs.map((post) => {
            post.commentValue = "";
            post.commentDisabled = true;
            return post;
          });

          this.setState((preState) => {
            return {
              posts: [...preState.posts, ...docs],
              page: preState.page + 1,
            };
          });
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
  render() {
    return (
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
                <i class="far fa-comment"></i>
                <p className={classes.ViewLikes}>
                  <b>{post.likes.length} </b>
                  {post.likes.length > 1 ? "likes" : "like"}
                </p>
                <p>
                  <b>{post.title && post.post_by.name} </b>
                  {post.title}What is Lorem Ipsum Lorem Ipsum is simply dummy
                  text of the printing and
                </p>
                <p className={classes.ViewComment}>
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
  };
};
export default connect(mapStateToProps)(Home);
