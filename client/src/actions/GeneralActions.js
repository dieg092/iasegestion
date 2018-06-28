import {
  CLOSE_MODAL,
  REQUEST_ACCESS_MODAL
} from './types';
import M from "materialize-css/dist/js/materialize.min.js";

export const requestAccessModal = () => {
  let login = document.getElementById('modal-login');
  let request = document.getElementById('modal-request');

  M.Modal.getInstance(login).close();
  M.Modal.getInstance(request).open();

  return {
    type: REQUEST_ACCESS_MODAL
  };
};

export const rememberPass = () => {
  let login = document.getElementById('modal-login');
  let remember = document.getElementById('modal-remember');

  M.Modal.getInstance(login).close();
  M.Modal.getInstance(remember).open();

  return {
    type: REQUEST_ACCESS_MODAL
  };
};

export const closeModal = (modal) => {
  let elem = document.getElementById(modal);


  const instance = M.Modal.getInstance(elem);
  instance.close();

  return {
    type: CLOSE_MODAL
  };
};
