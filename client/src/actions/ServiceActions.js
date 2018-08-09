import axios from 'axios';
import { FETCH_SERVICES, SERVICE_CREATED, SERVICE_CLICKED, SERVICE_DELETED } from './types';
import M from "materialize-css/dist/js/materialize.min.js";
import { POPULATION } from '../utils/population';

export const fetchServices = (page) => async dispatch => {
  const res = await axios.get('/api/services?page=' + page);

  dispatch({ type: FETCH_SERVICES, payload: res.data });
};

export const deleteService = (service, history) => async dispatch => {
  let message = 'Error al eliminar el servicio';
  const images = service.body.split('https://s3.eu-west-3.amazonaws.com/iase-test/');
  images.map( async (img, index) => {
    if (index !== 0) {
      const key = img.split('" alt')[0];
      const deleteImage = await axios.delete('/api/delete?key=' + key.split('" alt')[0]);
    }
  })
  const deleteMainImage = await axios.delete('/api/delete?key=' + service.mainPhoto);

  if (deleteMainImage.statusText === 'OK') {
    const res = await axios.delete('/api/service/' + service._id);

    if (res.statusText !== 'ERROR') {
      message = 'Servicio eliminado';
      history.push('/admin/servicios');
      dispatch({
        type: SERVICE_DELETED
      });
    }
  }

   window.M.toast({html: message, classes: 'rounded'});
}


export const serviceData = (service) => {
  return {
    type: SERVICE_CLICKED,
    payload: service.data[0]
  };
};

export const serviceClicked = (service, history) => async dispatch => {
  history.push('/admin/servicios/' + service.slug);

  return {
    type: SERVICE_CLICKED,
    payload: null
  };
};

export const submitService = (values, file, mainPhoto, editor, history, edit) => async dispatch => {
  let message = 'Error al guardar';
  let uploadConfig = '';
  let res = '';

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

  if (edit) {
    res = await axios.post('/api/service/' + history.location.pathname.split('/')[3], allValues);
  } else {
    res = await axios.post('/api/service', allValues);
  }


  if (res.statusText !== 'ERROR') {
    message = 'Servicio creado';
    history.push('/admin/servicios');
  }

  window.M.toast({html: message, classes: 'rounded'})

  dispatch({
    type: SERVICE_CREATED
  });
}
