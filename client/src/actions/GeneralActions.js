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


export const closeModal = (modal) => {
  let elem = '';

  switch (modal) {
    case 'modal-login':
      elem = document.getElementById(modal);
      break;
    case 'modal-request':
      elem = document.getElementById(modal);
      break;
    case 'modal-success-request':
      elem = document.getElementById(modal);
      break;
    default:
      break;
  }

  const instance = M.Modal.getInstance(elem);
  instance.close();

  return {
    type: CLOSE_MODAL
  };
};
