import { GET_USER_INFO } from '../actions/types'

const initializer = {
    email:'happy@balbadack.com',
}

export default (state = initializer, action) => {
    switch(action.type){
        case GET_USER_INFO:
            return{...state, 'info' : action.payload}
        default:
            return state; 
    }
}