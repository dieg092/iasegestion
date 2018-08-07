import axios from 'axios';
import { FETCH_SERVICES, SERVICE_CREATED } from './types';
import M from "materialize-css/dist/js/materialize.min.js";
import { POPULATION } from '../utils/population';

export const fetchServices = (page) => async dispatch => {
  const res = await axios.get('/api/services?page=' + page);

  dispatch({ type: FETCH_SERVICES, payload: res.data });
};

export const submitService = (values, file, mainPhoto, editor, history) => async dispatch => {
  let message = 'Error al guardar';
  let uploadConfig = '';
  if (file) {
    uploadConfig = await axios.get('/api/upload?folder=services');

    const upload = await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });

  }

  const allValues = {
    title: values.serviceTitle,
    shortDescription: values.shortDescription,
    important: values.important ? values.important : false,
    mainPhoto: uploadConfig.data && uploadConfig.data.key ? uploadConfig.data.key : '',
    editor: editor
  }
  const res = await axios.post('/api/service', allValues);

  if (res.statusText !== 'ERROR') {
    message = 'Servicio creado';
    history.push('/admin/servicios');
  }

  window.M.toast({html: message, classes: 'rounded'})

  dispatch({
    type: SERVICE_CREATED
  });
}
