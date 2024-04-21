import ActionTypes from "../actionTypes";

export const getProfileAction = (user_name) => async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.GET_PROFILE_DATA,
        payload: user_name
      })
    } catch (err) {
      console.log("Profile Action Error",err)
    }
};
