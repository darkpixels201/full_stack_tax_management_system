import ActionTypes from "../actionTypes"

export const setUser = (payload) => {
    return {
        type: ActionTypes.SET_USER,
        payload
    }
}