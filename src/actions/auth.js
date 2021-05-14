import axios from "axios";
export const login = (details) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await axios.post("/signin", details);
    console.log(res.data);
    dispatch({ type: "LOGIN", token: res.data.token, user: res.data.user });
  } catch (e) {
    console.log("ERROR OCCURED", e);
    dispatch({ type: "ERROR" });
  }
};
export const signup = (details) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const formData = new FormData();
    if (details.photo) {
      formData.append("photo", details.photo);
    }
    formData.append("name", details.name);
    formData.append("email", details.email);
    formData.append("password", details.password);
    const res = await axios.post("/signup", formData);
    console.log(res.data);
    dispatch({ type: "SIGNUP", token: res.data.token, user: res.data.user });
  } catch (e) {
    console.log("ERROR OCCURED", e);
    dispatch({ type: "ERROR" });
  }
};
export const follow = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await axios.post(
      `/follow/${userId}`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    dispatch({ type: "FOLLOW", user: res.data.user });
  } catch (e) {
    console.log("ERROR OCCURED", e);
    dispatch({ type: "ERROR" });
  }
};
export const unfollow = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await axios.post(
      `/unfollow/${userId}`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log("--------------------------------------------------------");
    console.log(res.data);
    dispatch({ type: "UNFOLLOW", user: res.data.user });
  } catch (e) {
    console.log("ERROR OCCURED", e);
    dispatch({ type: "ERROR" });
  }
};
export const updateUser = (email, name, history) => async (dispatch) => {
  dispatch({ type: "LOADING" });
  try {
    const user = await axios.put(
      `/update/user`,
      {
        email,
        name,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    dispatch({ type: "UPDATE_USER", user: user.data });
    history.goBack();
  } catch (e) {
    console.log(e);
    dispatch({ type: "ERROR" });
  }
};
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
