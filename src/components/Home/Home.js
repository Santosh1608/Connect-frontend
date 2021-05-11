import React, { Component } from "react";
import axios from "axios";
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
                <i class="far fa-heart"></i>
                <i class="far fa-comment"></i>
                <p>
                  <b>{post.likes.length}</b> likes
                </p>
                <p>
                  <b>{post.title && post.post_by.name} </b>
                  {post.title}What is Lorem Ipsum Lorem Ipsum is simply dummy
                  text of the printing and
                </p>
                <p className={classes.ViewComment}>
                  View all {post.comments.length} comments
                </p>
              </div>

              <div className={classes.Comment}>
                <input type="text" placeholder="Add a comment" />
                <span>Post</span>
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

export default Home;
