import {
    GET_USER_INFO,
    SIGNIN,
    SINGOUT,
    REGISTER,
} from '../actions/types'
import { combineReducers } from "redux";

const initializer = {
    email:'happy@balbadack.com',
}

export default (state = initializer, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            return{...state, 'info' : action.payload}
        case SIGNIN:
            return { ...state, user_info: action.payload };
        case REGISTER:
            return { ...state, register_info: action.payload };
        case SINGOUT:
            state = {};
            return combineReducers({ state: (state = {}) => state });
        default:
            return state;
    }
}