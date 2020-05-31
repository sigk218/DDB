import { GET_USER_INFO } from '../actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case GET_USER_INFO:
            return{...state, 'info' : action.payload}
        default:
            return state; 
    }
}