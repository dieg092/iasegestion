import {
  SUBMIT_REQUEST_SUCCESS,
  SUBMIT_REQUEST_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  emailRequest: '',
  error: ''
};

export default function(state =INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_REQUEST_SUCCESS:
      return { ...state, emailRequest: action.payload, error: '' };
    case SUBMIT_REQUEST_ERROR:
      return { ...state, emailRequest: action.payload, error: 'Correo en uso' };
    default:
      return state;
  }
}
