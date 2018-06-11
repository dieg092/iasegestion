import axios from 'axios';
import {
  SUBMIT_REQUEST_SUCCESS,
  SUBMIT_REQUEST_ERROR
} from './types';
import M from "materialize-css/dist/js/materialize.min.js";

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
