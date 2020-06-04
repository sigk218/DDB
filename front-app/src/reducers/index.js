import { combineReducers } from 'redux';
import statusReducers from './statusReducers'
import userReducers from './userReducers';
import hosReducers from './hosReducers';
import reviewReducers from './reviewReducers';

export default combineReducers({
  status: statusReducers,
  users: userReducers,
  hos: hosReducers,
  review: reviewReducers
});
