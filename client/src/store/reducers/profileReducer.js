import ActionTypes from "../actionTypes";

const INITIAL_STATE = {
  user_name: [],
};

export const profileReducer = (state = INITIAL_STATE, action) => {
  // console.log("Reducer Action Type", action.payload);
  switch (action.type) {
    case ActionTypes.GET_PROFILE_DATA:
      return { ...state, user_name: action.payload };
    default:
      return state;
  }
};
