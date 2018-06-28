import axios from 'axios';
import {
  SUBMIT_REQUEST_SUCCESS,
  SUBMIT_REQUEST_ERROR,
  USER_LOGGED,
  USER_LOGGED_FAIL,
  USER_REMEMBER_SUCCESS,
  USER_REMEMBER_FAIL,
  USER_CHANGE_PASS_SUCCESS,
  USER_CHANGE_PASS_FAIL
} from './types';
import M from "materialize-css/dist/js/materialize.min.js";

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  console.log(res.data)
  dispatch({ type: USER_LOGGED, payload: res.data });
};

export const logOut = () => async dispatch => {
  const res = await axios.get('/api/logout')

  dispatch({ type: USER_LOGGED, payload: {} });
}

export const submitRequest = (values, history) => async dispatch => {
  const res = await axios.post('/api/solicitud', values);

  if (res.statusText === "OK") {
    const request = document.getElementById('modal-request');
    const succesRequest = document.getElementById('modal-success-request');

    M.Modal.getInstance(request).close();
    M.Modal.getInstance(succesRequest).open();

    dispatch({ type: SUBMIT_REQUEST_SUCCESS, payload: values.emailRequest });
  } else {
    dispatch({ type: SUBMIT_REQUEST_ERROR, payload: values.emailRequest });
  }
};

export const submitRemember = (values, history) => async dispatch => {
  const res = await axios.post('/api/recordar', values);

  const remember = document.getElementById('modal-remember');
  const succesRemember = document.getElementById('modal-success-remember');

  if (res.statusText === "OK") {
     M.Modal.getInstance(remember).close();
     M.Modal.getInstance(succesRemember).open();
     dispatch({ type: USER_REMEMBER_SUCCESS, payload: values.emailRemember });
  } else {
     dispatch({ type: USER_REMEMBER_FAIL, payload: '' });
  }
};

export const submitChangePass = (values, history) => async dispatch => {
  if (values.contrasenaRemember === values.repetirContrasenaRemember) {
    const token = history.location.pathname.split('/')[2];
    const res = await axios.post('/api/recordar/' + token, values);
    console.log(res)
    if (res.statusText === "OK") {
       window.M.toast({html: 'Contraseña cambiada', classes: 'rounded'});
       history.push('/');
       dispatch({ type: USER_CHANGE_PASS_SUCCESS, payload: '' });
    } else {
       dispatch({ type: USER_CHANGE_PASS_FAIL, payload: 'Error al cambiar la contraseña' });
    }
  } else {
    dispatch({ type: USER_CHANGE_PASS_FAIL, payload: 'Las contraseñas no coinciden' });
  }
};

export const submitLogin = (values, history) => async dispatch => {
  const res = await axios.post('/api/login', values);
  const modalLogin = document.getElementById('modal-login');

  if (res.data[0].email) {
     history.push('/usuarios');
     M.Modal.getInstance(modalLogin).close();
     dispatch({ type: USER_LOGGED, payload: res.data[0] });
  } else {
     dispatch({ type: USER_LOGGED_FAIL, payload: res.data[0] });
  }
};
