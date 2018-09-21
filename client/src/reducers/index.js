import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import serviceReducer from './serviceReducer';
import postReducer from './postReducer';
import docReducer from './docReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  user: userReducer,
  service: serviceReducer,
  post: postReducer,
  doc: docReducer
});
