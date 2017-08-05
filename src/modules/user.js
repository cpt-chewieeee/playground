
const ACTION_HANDLERS = {

}

const initialState = {
    isLoggedin: false
}

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}