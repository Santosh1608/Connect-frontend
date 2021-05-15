import axios from "axios";
export const login = (details) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await axios.post("/signin", details);
    console.log(res.data);
    dispatch({
      type: "LOGIN",
      token: res.data.token,
      user: res.data.user,
      success: "Successfully Logged In",
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE_SUCCESS" });
    }, 3000);
  } catch (e) {
    console.log(e.response.data);
    console.log("ERROR OCCURED", e);
    dispatch({ type: "ERROR", error: e.response.data });
    setTimeout(() => {
      dispatch({ type: "REMOVE_ERROR" });
    }, 3000);
  }
};
export const signup = (details) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const formData = new FormData();
    if (details.compressedPhoto) {
      formData.append("photo", details.compressedPhoto);
    }
    formData.append("name", details.name);
    formData.append("email", details.email);
    formData.append("password", details.password);
    const res = await axios.post("/signup", formData);
    console.log(res.data);
    dispatch({
      type: "SIGNUP",
      token: res.data.token,
      user: res.data.user,
      success: "Successfully Signed Up",
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE_SUCCESS" });
    }, 3000);
  } catch (e) {
    console.log("ERROR OCCURED", e.response);
    dispatch({ type: "ERROR", error: e.response.data });
    setTimeout(() => {
      dispatch({ type: "REMOVE_ERROR" });
    }, 3000);
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
    dispatch({ type: "ERROR", error: e.response.data });
    setTimeout(() => {
      dispatch({ type: "REMOVE_ERROR" });
    }, 3000);
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
    dispatch({ type: "ERROR", error: e.response.data });
    setTimeout(() => {
      dispatch({ type: "REMOVE_ERROR" });
    }, 3000);
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
    dispatch({
      type: "UPDATE_USER",
      user: user.data,
      success: "User Updated Successfully",
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE_SUCCESS" });
    }, 3000);
    history.goBack();
  } catch (e) {
    console.log(e);
    dispatch({ type: "ERROR", error: e.response.data });
    setTimeout(() => {
      dispatch({ type: "REMOVE_ERROR" });
    }, 3000);
  }
};
export const updateUserProfile = (photo, history) => async (dispatch) => {
  try {
    console.log("UPDATEPROFILE ACTIONS");
    dispatch({ type: "LOADING" });
    const formData = new FormData();
    if (photo) {
      formData.append("photo", photo);
    }
    const user = await axios.put(`/updateProfile/user`, formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "UPDATE_PIC",
      user: user.data,
      success: "Profile Pic Updated successfully",
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE_SUCCESS" });
    }, 3000);
    history.goBack();
  } catch (e) {
    console.log(e);
    dispatch({ type: "ERROR", error: e.response.data });
    setTimeout(() => {
      dispatch({ type: "REMOVE_ERROR" });
    }, 3000);
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: "LOGOUT",
    success: "Logged Out successfully",
  });
  setTimeout(() => {
    dispatch({ type: "REMOVE_SUCCESS" });
  }, 3000);
};
