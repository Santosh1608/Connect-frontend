import React, { Component } from "react";
import axios from "axios";
import { Waypoint } from "react-waypoint";
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
        <ul className="list-group list-group-flush">
          {this.state.posts.map((post) => (
            <img
              style={{ display: "block" }}
              key={post._id}
              src={post.photo.url}
            />
          ))}
        </ul>
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
