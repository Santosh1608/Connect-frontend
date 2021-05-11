const initialState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  loading: false,
  error: false,
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
      };
    case "FOLLOW":
      localStorage.setItem("user", JSON.stringify(action.user));
      console.log(action.user);
      return { ...state, user: action.user };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...state, user: null, token: null };
    case "ERROR":
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
};

export default authReducer;
