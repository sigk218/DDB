import { 
    GET_REVIEW_DATA, 
    GET_REVIEW_LIST,
    GET_MY_REVIEW_LIST
} from '../actions/types'

const initializer = {
    info: {},
    list: [],
    mylist:[]
}

export default (state = initializer, action) => {
    switch(action.type){
        case GET_REVIEW_DATA:
            return {...state, info : action.payload}
        case GET_REVIEW_LIST:
            console.log('list', action.list)
            return {...state, list:action.list}
        case GET_MY_REVIEW_LIST:
            console.log('my list', action.list)
            return {...state, mylist:action.list}
        default:
            return state; 
    }
}