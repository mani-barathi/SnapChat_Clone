export const initialState = {
    user: null,
    previewSnapURL: null
}

export const reducer = (state, action) => {
    // console.log('state', state)
    // console.log('action', action)
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'SET_PREVIEW_SNAP_URL':
            return {
                ...state,
                previewSnapURL: action.previewSnapURL
            }
        default:
            return state
    }
}