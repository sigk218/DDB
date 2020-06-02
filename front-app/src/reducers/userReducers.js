import { 
    GET_USER_INFO,
    SIGNIN,
} from '../actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case GET_USER_INFO:
            return{...state, 'info' : action.payload}
            case SIGNIN:
                return { ...state, user_info: action.payload };
        default:
            return state; 
    }
}