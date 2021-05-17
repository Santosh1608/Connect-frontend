const initialState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  loading: false,
  error: false,
  errorMsg: null,
  successMsg: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "LOGIN":
    case "SIGNUP":
      console.log(action);
      localStorage.setItem("token", action.token);
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        ...state,
        token: action.token,
        user: action.user,
        loading: false,
        successMsg: action.success,
      };
    case "FOLLOW":
    case "UNFOLLOW":
    case "UPDATE_USER":
    case "UPDATE_PIC":
      localStorage.setItem("user", JSON.stringify(action.user));
      console.log(action.user);
      return {
        ...state,
        user: action.user,
        loading: false,
        successMsg: action.success,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        successMsg: action.success,
      };
    case "ERROR":
      let error = null;
      if (action.error) {
        error = action.error.error;
      }
      return { ...state, error: true, loading: false, errorMsg: error };
    case "SUCCESS":
      return { ...state, successMsg: action.success };
    case "REMOVE_ERROR":
      return { ...state, error: false, errorMsg: null };
    case "REMOVE_SUCCESS":
      return { ...state, successMsg: null };
    default:
      return state;
  }
};

export default authReducer;
