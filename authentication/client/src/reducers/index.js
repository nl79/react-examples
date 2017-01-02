import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authenticationReducer from './authenticationReducer';

const rootReducer = combineReducers({
  form,
  authentication: authenticationReducer
});

export default rootReducer;
