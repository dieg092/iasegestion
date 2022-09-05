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
import { POPULATION } from '../utils/population';
import $ from 'jquery';

window.jQuery = $;

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: USER_LOGGED, payload: res.data });
};

// export const logOut = () => async dispatch => {
//   const res = await axios.get('/api/logout')
// }

export const submitRequest = (values, history) => async dispatch => {
  //let uploadConfig = '';

  const populateId = POPULATION.find((element) => {
    if ((values.population && element.label === values.population) || (values.population2 && element.label === values.population2)) {
      return element.value;
    }
    return null;
  });
  values.populationId = populateId.value;
  const res = await axios.post('/api/solicitud', values);
  if (res.data === "OK") {
    await axios.post('/api/pdf', values)
      .then(async (resp) => {
        // if (resp.data) {
        //   uploadConfig = await axios.get('/api/upload?folder=pdfs&type=application/pdf');
        //   await axios.put(uploadConfig.data.url, resp, {
        //     headers: {
        //       'Content-Type': '.pdf'
        //     }
        //   });
        // }

        // const allValues = {
        //   pdf: resp.data ? resp.data : '',
        //   email: values.emailRequest ? values.emailRequest : values.emailRequestAccess
        // }
        //
        // const respu = await axios.post('/api/user/pdf', allValues);

        if (resp.data === "OK") {
          const request = document.getElementById('modal-request');
          const clientAccess = document.getElementById('modal-client-access');
          const succesRequest = document.getElementById('modal-success-request');

          M.Modal.getInstance(request).close();
          M.Modal.getInstance(clientAccess).close();
          M.Modal.getInstance(succesRequest).open();

          dispatch({ type: SUBMIT_REQUEST_SUCCESS, payload: values.emailRequest ? values.emailRequest : values.emailRequestAccess });
        }
      });
  } else if (res.data === "CORREO EN USO") {
    dispatch({ type: SUBMIT_REQUEST_ERROR, payload: 'Correo en uso' });
  } else if (res.data === "EMPRESA YA REGISTRADA") {
    dispatch({ type: SUBMIT_REQUEST_ERROR, payload: 'Empresa ya registrada' });
  } else {
    dispatch({ type: SUBMIT_REQUEST_ERROR, payload: 'NIF/CIF en uso' });
  }
};


export const submitPdf = (file, pdf, history) => async dispatch => {
  let message = 'Error al guardar';
  let uploadConfig = '';
  let res = '';

  if (file) {
    uploadConfig = await axios.get('/api/upload?folder=signatures&type=application/pdf');
    await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });
  }

  const allValues = {
    digitalSignature: uploadConfig.data && uploadConfig.data.key ? uploadConfig.data.key : '',
    userId: history.location.pathname.split('/')[3],
    token: history.location.pathname.split('/')[4]
  }

  res = await axios.post('/api/user/digitalSignature', allValues);

  if (res.data === 'OK') {
    message = 'PDF enviado';
    history.push('/');
  }

  window.M.toast({html: message, classes: 'rounded'})

  dispatch({
    type: SUBMIT_REQUEST_SUCCESS
  });
};

export const tokenExist = (history) => async dispatch => {
  const res = await axios.get('/api/user/token/' + history.location.pathname.split('/')[4]);

  if (res.data !== 'OK') {
    history.push('/');
  }

  dispatch({
    type: SUBMIT_REQUEST_SUCCESS
  });
}


export const submitRemember = (values, history) => async dispatch => {
  const res = await axios.post('/api/recordar', values);
  const remember = document.getElementById('modal-remember');
  const succesRemember = document.getElementById('modal-success-remember');

  if (res.data === 'OK') {
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

    if (res.data === "OK") {
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
    password = '16cz98ws';
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
