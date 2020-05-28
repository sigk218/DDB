import { GET_HOS_DATA } from '../actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case GET_HOS_DATA:
            return{...state, 'info' : action.payload}
        default:
            return state; 
    }
}