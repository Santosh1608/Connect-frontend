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
    comment: "",
    commentDisabled: true,
  };
  componentDidMount() {
    this.getData();
  }
  onChangeHandler = (e) => {
    if (e.target.value.length > 0) {
      this.setState({ commentDisabled: false });
    } else {
      this.setState({ commentDisabled: true });
    }
    this.setState({ comment: e.target.value });
  };
  onCommentHandler = async (postId, comment) => {
    try {
      const res = await axios.post(
        `/post/comment/${postId}`,
        {
          comment: this.state.comment,
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
          console.log(docs);

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
    console.log("STATE", this.state.posts);
    return (
      <div>
        <div className={classes.Wrapper}>
          {this.state.posts.map((post) => (
            <div class={classes.card}>
              <div className={classes.cardTop}>
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
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="Add a comment"
                  name="comment"
                  value={this.state.comment}
                />
                <button
                  disabled={this.state.commentDisabled}
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
            <h5 className="text-muted mt-5">Loading data...</h5>
          </Waypoint>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(Home);
