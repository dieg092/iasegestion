import {
  SUBMIT_REQUEST_SUCCESS,
  SUBMIT_REQUEST_ERROR,
  USER_LOGGED,
  USER_LOGGED_FAIL,
  USER_LOGGED_DISABLED,
  USER_REMEMBER_SUCCESS,
  USER_REMEMBER_FAIL,
  USER_CHANGE_PASS_SUCCESS,
  USER_CHANGE_PASS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  emailRequest: '',
  emailRemember: '',
  error: '',
  errorLogin: '',
  errorRemember: '',
  errorChangePass: '',
  userLogged: null
};

export default function(state =INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_REQUEST_SUCCESS:
      return { ...state, emailRequest: action.payload, error: '' };
    case SUBMIT_REQUEST_ERROR:
      return { ...state, emailRequest: action.payload, error: action.payload };
    case USER_LOGGED:
      return { ...state, userLogged: action.payload, errorLogin: '' };
    case USER_LOGGED_FAIL:
      return { ...state, errorLogin: 'Credenciales erróneas' };
    case USER_LOGGED_DISABLED:
      return { ...state, errorLogin: 'Usuario desactivado' };
    case USER_REMEMBER_SUCCESS:
      return { ...state, emailRemember: action.payload, errorRemember: '' };
    case USER_REMEMBER_FAIL:
      return { ...state, emailRemember: action.payload, errorRemember: 'Correo no encontrado.' };
    case USER_CHANGE_PASS_SUCCESS:
      return { ...state, errorChangePass: '' };
    case USER_CHANGE_PASS_FAIL:
      return { ...state, errorChangePass: action.payload };
    default:
      return state;
  }
}
