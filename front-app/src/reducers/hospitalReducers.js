import { GET_HOS_DATA, GET_HOS_SEARCH_LIST } from '../actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case GET_HOS_DATA:
            return {...state, info : action.payload}
        case GET_HOS_SEARCH_LIST:
            return {...state, searchList: action.res}
        default:
            return state; 
    }
}