const initialState = {
  model: false,
  people: null,
};
const modelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MODEL_OPEN":
      return { ...state, model: true, people: action.people };
    case "MODEL_CLOSE":
      return { ...state, model: false, people: null };
    default:
      return state;
  }
};

export default modelReducer;
