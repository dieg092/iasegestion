import axios from 'axios';
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
} from './types';
import M from "materialize-css/dist/js/materialize.min.js";

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: USER_LOGGED, payload: res.data });
};

// export const logOut = () => async dispatch => {
//   const res = await axios.get('/api/logout')
// }

export const submitRequest = (values, history) => async dispatch => {
  let val = {
    emailRequest: values.emailRequest ? values.emailRequest : values.emailRequestAccess
  }

  const res = await axios.post('/api/solicitud', val)
    .then((res) => {
        console.log(res)
      if (res.statusText === "OK") {
        const request = document.getElementById('modal-request');
        const clientAccess = document.getElementById('modal-client-access');
        const succesRequest = document.getElementById('modal-success-request');

        M.Modal.getInstance(request).close();
          M.Modal.getInstance(clientAccess).close();
        M.Modal.getInstance(succesRequest).open();

        dispatch({ type: SUBMIT_REQUEST_SUCCESS, payload: val.emailRequest });
      } else {
        dispatch({ type: SUBMIT_REQUEST_ERROR, payload: res });
      }
    }).catch((err) => {
      console.log(err)
    });
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

export const submitLogin = (values, history, worker) => async dispatch => {
  let email = '';
  let password = ''
  if (worker) {
    email = 'invitado@iasegestion.com';
    password = '1234';
  }

  let val = {
    email: worker ? email : (values.email ? values.email : values.emailAccess),
    password: worker ? password : (values.password ? values.password : values.passwordAccess)
  }

  const res = await axios.post('/api/login', val);
  const modalLogin = document.getElementById('modal-login');
  const overlaySideNav = document.querySelectorAll('.sidenav');

  if (res.data.email) {
    if (res.data.isActive) {
      history.push('/');

      M.Modal.getInstance(modalLogin).close();
      M.Sidenav.getInstance(overlaySideNav[0]).close();
      dispatch({ type: USER_LOGGED, payload: res.data });
    } else {
      dispatch({ type: USER_LOGGED_DISABLED, payload: res.data });
    }
  } else {
     dispatch({ type: USER_LOGGED_FAIL, payload: res.data });
  }
};
