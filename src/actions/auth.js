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
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
