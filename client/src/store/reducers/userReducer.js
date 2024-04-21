import ActionTypes from "../actionTypes";

const INITIAL_STATE = {
  user: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      // console.log('REDUCER USER __________', action.payload);
      return { ...state, user: action?.payload };
      case ActionTypes.LOGOUT: // Handle the PURGE action
      return { ...state, user: null }; // Reset the state to its initial values
    default:
      return state;
  }
}
