import axios from 'axios';
import { FETCH_SERVICES, SERVICE_CREATED, SERVICE_CLICKED,
  SERVICE_DELETED, SERVICE_OTHERS, SERVICES_FAVOURITE } from './types';
import M from "materialize-css/dist/js/materialize.min.js";
import CONSTANTS from '../utils/constants';

export const fetchServices = (page) => async dispatch => {
  const res = await axios.get('/api/services?page=' + page);

  dispatch({ type: FETCH_SERVICES, payload: res.data });
};

export const getService = (history) => async dispatch => {
  const service = history.location.pathname.split('/')[2];

  const res = await axios.get('/api/service/' + service);

  dispatch({ type: SERVICE_CLICKED, payload: res.data });
};

export const otherServices = (history) => async dispatch => {
  const service = history.location.pathname.split('/')[2];

  const res = await axios.get('/api/service/others/' + service);

  dispatch({ type: SERVICE_OTHERS, payload: res.data });
};

export const favouriteServices = () => async dispatch => {
  const res = await axios.get('/api/services/favourite');

  dispatch({ type: SERVICES_FAVOURITE, payload: res.data });
};

export const deleteService = (service, history) => async dispatch => {
  let message = 'Error al eliminar el servicio';
  const images = service.body.split(CONSTANTS.URL.photo);
  images.map( async (img, index) => {
    if (index !== 0) {
      const key = img.split('" alt')[0];
      await axios.delete('/api/delete?key=' + key.split('" alt')[0]);
    }
  });
  console.log('hola');
  const deleteMainImage = await axios.delete('/api/delete?key=' + service.mainPhoto);
  console.log(deleteMainImage);
  if (deleteMainImage.data === 'OK') {
    const res = await axios.delete('/api/service/' + service._id);

    if (res.data !== 'ERROR') {
      message = 'Servicio eliminado';
      window.history.back();
      let modal = document.getElementById('modal-delete-service');

      M.Modal.getInstance(modal).close();
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

export const submitService = (values, file, mainPhoto, editor, history, edit, serviceSelected) => async dispatch => {
  let message = 'Error al guardar';
  let uploadConfig = '';
  let res = '';

  if (file) {
    uploadConfig = await axios.get('/api/upload?folder=services');

    await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });
  }

  const imagesBodySelected = serviceSelected && serviceSelected.body.split(CONSTANTS.URL.photo);
  const imagesBody = editor && editor.split(CONSTANTS.URL.photo);

  imagesBodySelected && imagesBodySelected.map( async (img, index) => {
    if (index !== 0) {
      let repeated = false;
      const keySelected = img.split('" alt')[0];
      imagesBody && imagesBody.map( async (imge, index) => {
        if (index !== 0) {
          const keyBody = imge.split('" alt')[0];
          if (keyBody === keySelected) {
            repeated = true;
          }
        }
      });
      if (!repeated) {
        await axios.delete('/api/delete?key=' + keySelected.split('" alt')[0]);
      }
    }
  });

  if (serviceSelected && file && serviceSelected.mainPhoto.split('/')[1] !== file.name) {
     await axios.delete('/api/delete?key=' + serviceSelected.mainPhoto);
  }

  const allValues = {
    title: values.serviceTitle,
    shortDescription: values.shortDescription,
    important: values.important ? values.important : false,
    alt: values.altImage,
    mainPhoto: uploadConfig.data && uploadConfig.data.key ? uploadConfig.data.key : '',
    editor: editor
  }

  if (edit) {
    res = await axios.post('/api/service/' + history.location.pathname.split('/')[3], allValues);
  } else {
    res = await axios.post('/api/service', allValues);
  }


  if (res.data !== 'ERROR') {
    if (edit) {
      message = 'Servicio editado';
    } else {
      message = 'Servicio creado';
    }

    history.push('/admin/servicios');
  }

  window.M.toast({html: message, classes: 'rounded'})

  dispatch({
    type: SERVICE_CREATED
  });
}
