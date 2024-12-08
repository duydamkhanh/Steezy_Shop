interface State {
    state: any[]
}

interface Action {
    type: string,
    payload?: any
}


const initState = {
    categories: []
}

const categoryReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'DELETE_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }

        default: 
            return state
    }
}

export { initState }

export default categoryReducer