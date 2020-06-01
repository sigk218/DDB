import { 
    TOGGLE_SEARCH_MODAL, 
    SELECT_HOS, 
    HAS_RECIEPT 
} from '../actions/types'

const initializer = {
    isAuthorized: true,
    isSearching: false,
    hosSelected: false,
    hasReciept: false
}

export default (state = initializer, action) => {
    switch(action.type){
        case TOGGLE_SEARCH_MODAL:
            return{...state, isSearching : !state.isSearching}
        case SELECT_HOS:
            return{...state, hosSelected : action.hosSelected}
        case HAS_RECIEPT:
            return{...state, isSearching : state.hasReciept}
        default:
            return state;
    }
}