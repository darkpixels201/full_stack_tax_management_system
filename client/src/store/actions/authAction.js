import ActionTypes from "../actionTypes"

export const setTokens = (payload) => {
    return {
        type: ActionTypes.SET_TOKENS,
        payload
    }
}

export const logout = () => {
    return {
        type: ActionTypes.LOGOUT,
    }
}