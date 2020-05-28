import { combineReducers } from 'redux';
import userReducers from './userReducers';
import hospitalReducers from './hospitalReducers';
import reviewReducers from './reviewReducers';
export default combineReducers({
    users: userReducers,
    hos_info: hospitalReducers,
    review_info: reviewReducers,
  });
  