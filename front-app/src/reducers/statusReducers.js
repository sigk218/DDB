import { 
    TOGGLE_SEARCH_MODAL, 
    SELECT_HOS, 
    HAS_RECIEPT, 
    COMPLETE_REVIEW
} from '../actions/types'

const initializer = {
    isAuthorized: true,
    isSearching: false,
    hosSelected: false,
    hosName: '',
    hasReciept: false,
    reviewFromMain: true,
    completeReview: false
}

export default (state = initializer, action) => {
    switch(action.type){
        case TOGGLE_SEARCH_MODAL:
            return{...state, isSearching : !state.isSearching}
        case SELECT_HOS:
            return{...state, hosSelected : action.hosSelected, hosName : action.hosName}
        case HAS_RECIEPT:
            return{...state, isSearching : state.hasReciept}
        case COMPLETE_REVIEW:
            return{...state, completeReview: action.res}
        default:
            return state;
    }
}