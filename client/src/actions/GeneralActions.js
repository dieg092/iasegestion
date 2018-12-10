import axios from 'axios';
import {
  CLOSE_MODAL,
  REQUEST_ACCESS_MODAL,
  CONTACT_MESSAGE
} from './types';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';

window.jQuery = $;


export const requestAccessModal = () => {
  let login = document.getElementById('modal-login');
  let request = document.getElementById('modal-request');

  M.Modal.getInstance(login).close();
  M.Modal.getInstance(request).open();

  return {
    type: REQUEST_ACCESS_MODAL
  };
};

export const requestModal = () => {
  let request = document.getElementById('modal-request');

  M.Modal.getInstance(request).open();

  return {
    type: REQUEST_ACCESS_MODAL
  };
}

export const clientAccessModal = () => {
  let clientAccess = document.getElementById('modal-client-access');

  M.Modal.getInstance(clientAccess).open();

  return {
    type: REQUEST_ACCESS_MODAL
  };
}

export const rememberPass = () => {
  let login = document.getElementById('modal-login');
  let remember = document.getElementById('modal-remember');
  let clientAccess = document.getElementById('modal-client-access');

  M.Modal.getInstance(login).close();
  M.Modal.getInstance(clientAccess).close();
  M.Modal.getInstance(remember).open();

  return {
    type: REQUEST_ACCESS_MODAL
  };
};

export const showConditions = () => {
  let conditions = document.getElementById('modal-conditions');
  M.Modal.getInstance(conditions).open();

  return {
    type: CLOSE_MODAL
  };
}

export const closeModal = (modal) => {
  let elem = document.getElementById(modal);

  const instance = M.Modal.getInstance(elem);
  instance.close();

  return {
    type: CLOSE_MODAL
  };
};

export const submitContact = (values) => async dispatch => {
  const res = await axios.post('/api/contact', values);
  const success = 'Mensaje enviado';
  const fail = 'Error al enviar el mensaje, Intentelo de nuevo';

  if (res.data === "OK") {
    window.M.toast({html: success, classes: 'rounded'});
  } else {
    window.M.toast({html: fail, classes: 'rounded'});
  }

  dispatch({
    type: CONTACT_MESSAGE,
    payload: null
  })
};
