import {
    GET_USER_INFO,
    SIGNIN,
    SINGOUT,
    REGISTER,
} from '../actions/types'
import { combineReducers } from "redux";

export default (state = {}, action) => {
    switch (action.type) {
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