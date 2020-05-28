import { GET_REVIEW_DATA } from '../actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case GET_REVIEW_DATA:
            return{...state, 'info' : action.payload}
        default:
            return state; 
    }
}