import { combineReducers } from 'redux';
import userReducers from './userReducers';
import hospitalReducers from './hospitalReducers';
import reviewReducers from './reviewReducers';
import recieptReducers from './recieptReducers'
import newReviewReducers from './newReviewReducers'
import statusReducers from './statusReducers'

export default combineReducers({
    users: userReducers,
    hos_info: hospitalReducers,
    review_info: reviewReducers,
    reciept_info: recieptReducers,
    new_Review : newReviewReducers,
    status: statusReducers
  });