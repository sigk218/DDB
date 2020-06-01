import { UPLOAD_RECIEPT_INFO } from './../actions/types'



const reciept = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_RECIEPT_INFO:
            console.log('upload reciept')
            return Object.assign({}, state, {
                bufferData: action.bff,
                dateIs: action.dateIs,
                hasHos: action.hasHos,
                items: action.items
            })
        default:
            return state
    }
}

export default reciept

