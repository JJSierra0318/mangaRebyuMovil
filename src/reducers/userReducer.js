const userReducer = (state = null, action) => {
    switch(action.type) {
        case "SET_USER":
            return action.data
        case "DEL_USER":
            return null
        default:
            return state
    }
}

export const setUser = (user) => {
    return async dispatch => {
        const data = user
        dispatch({
            type: "SET_USER",
            data
        })
    }
}

export const delUser = () => {
    return async dispatch => {
        dispatch({
            type: "DEL_USER"
        })
    }
}

export default userReducer