import ActionTypes from "../actionTypes";

const INITIAL_STATE = {
  tokens: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SET_TOKENS:
      return { ...state, tokens: action.payload };
    case ActionTypes.LOGOUT:
      console.log("Logout Successfully")
      return {
        tokens: null,
      };
    default:
      return state;
  }
}
