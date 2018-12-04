import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import restaurantReducer from './restaurant-reducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  restaurant: restaurantReducer
});
