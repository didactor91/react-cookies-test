const reducer = (state = [], action) => {
    switch (action.type) {
        case 'TRANSLATE_DATA':
            return [
                {
                    text: action.data,
                },
            ]
        default:
            return state
    }
}
export default reducer
