import axios from 'axios';
import { FETCH_USERS, USER_CLICKED, USER_CHANGE_STATE, USER_SAVED } from './types';
import M from "materialize-css/dist/js/materialize.min.js";
import { POPULATION } from '../utils/population';

export const fetchUsers = (page, filters) => async dispatch => {
  const filter = filterUsers(filters)

  const res = await axios.get('/api/usuarios?page=' + page + filter);

  dispatch({ type: FETCH_USERS, payload: res.data });
};

export const userClicked = (user, history) => async dispatch => {
  history.push('/admin/usuarios/' + user._id);

  dispatch({
    type: USER_CLICKED,
    payload: null
  });
};

export const cleanUserSelected = () => {
  return {
    type: USER_CLICKED,
    payload: null
  };
}

export const userData = (user) => {
  return {
    type: USER_CLICKED,
    payload: user.data[0]
  };
};

export const changeState = (user, state, history) => async dispatch => {
  const res = await axios.post('/api/usuarios/' + user._id + '/changeState/' + !state);

  const userChanged = user;
  userChanged.isActive = !state;
  dispatch({
    type: USER_CHANGE_STATE,
    payload: userChanged
  })

  if (res.data.result === 'OK') {
    dispatch({
      type: USER_CLICKED,
      payload: userChanged
    });
  } else {
    dispatch({
      type: USER_CLICKED,
      payload: user
    });
  }
};

export const submitUser = (userId, values) => async dispatch => {
  let valuesForm = values;
  let message = 'Error al guardar';

  const populateId = POPULATION.find((element) => {
    if (element.label === values.population) {
      return element.value;
    }
    return null;
  });

  valuesForm.populationId = populateId.value;

  const res = await axios.post('/api/usuarios/' + userId, values);

  if (res.data === 'OK') {
    message = 'Usuario Guardado';
  } else if (res.data === 'OK CORREO') {
    message = 'Usuario Guardado y Correo con Claves Enviado';
  } else  if (res.data === 'OK NO CORREO') {
    message = 'Usuario Guardado. ERROR al enviar el Correo con las Claves';
  }

  window.M.toast({html: message, classes: 'rounded'})

  dispatch({
    type: USER_SAVED
  });
};

export const regenerateAccess = (userId) => async dispatch => {
  const resendModal = document.getElementById('modal-resend-access');
  let  message = 'Error al enviar el correo';
  const res =  await axios.post('/api/usuarios/' + userId + '/token');

  if (res.data === 'OK') {
    message = 'Correo enviaodo';
  }

  M.Modal.getInstance(resendModal).close();
  window.M.toast({html: message, classes: 'rounded'});
}

export const regeneratePass = (userId) => async dispatch => {
  const res = await axios.post('/api/usuarios/' + userId + '/regenerar');
  let message = 'ERROR al generar y al enviar el Correo con las Claves';
  const resendModal = document.getElementById('modal-resend-pass');

  if (res.data === 'OK CORREO') {
    message = 'Contraseña generada y Correo con Claves Enviado';
  } else  if (res.data === 'OK NO CORREO') {
    message = 'Contraseña generada. ERROR al enviar el Correo con las Claves';
  }
  M.Modal.getInstance(resendModal).close();
  window.M.toast({html: message, classes: 'rounded'});
}

export const deleteUser = (user, history) => async dispatch => {
  //Eliminar pdf y usuarios
  const deletePDF = await axios.delete('/api/delete?key=' + user.digitalSignature);
  let message = 'Error al eliminar usuario y el PDF';

  if (deletePDF.data === 'OK') {
    if(user.pdf) {
      const deletePDF2 = await axios.delete('/api/delete?key=' + user.pdf);

      if (deletePDF2.data === 'OK') {
        const res = await axios.delete('/api/usuarios/' + user._id);

        if (res.data !== 'ERROR') {
          message = 'PDF y Usuario eliminados. Correo orientativo enviado';

          let modal = document.getElementById('modal-delete-user');

          M.Modal.getInstance(modal).close();

          history.push('/admin/usuarios');

          dispatch({
            type: USER_SAVED
          });
        }
      }
    } else {
      const res = await axios.delete('/api/usuarios/' + user._id);

      if (res.data !== 'ERROR') {
        message = 'PDF y Usuario eliminados. Correo orientativo enviado';

        let modal = document.getElementById('modal-delete-user');

        M.Modal.getInstance(modal).close();

        history.push('/admin/usuarios');

        dispatch({
          type: USER_SAVED
        });
      }
    }

  }

   window.M.toast({html: message, classes: 'rounded'});
}

export const deleteDigitalSignature = (user, history) => async dispatch => {
  let message = 'Error al eliminar el PDF';

  const deletePDF = await axios.delete('/api/delete?key=' + user.digitalSignature);

  if (deletePDF.data === 'OK') {
    const res = await axios.post('/api/usuarios/' + user._id + '/deleteSignature', user);

    if (res.data !== 'ERROR') {
      message = 'PDF eliminado y solicitud enviada';

      let modal = document.getElementById('modal-delete-signature');

      M.Modal.getInstance(modal).close();

      window.location.reload();

      dispatch({
        type: USER_SAVED
      });

    }
  }

   window.M.toast({html: message, classes: 'rounded'});
}

export const filterUsers = (filters) => {
  let filter = "&";
  if (filters && filters.email) {
    filter = filter + '&email=' + filters.email;
  }
  if (filters && filters.type) {
    filter = filter + '&type=' + filters.type;
  }
  if (filters && filters.businessName) {
    filter = filter + '&businessName=' + filters.businessName;
  }
  if (filters && filters.name) {
    filter = filter + '&name=' + filters.name;
  }
  if (filters && filters.lastName) {
    filter = filter + '&lastName=' + filters.lastName;
  }
  if (filters && filters.nif) {
    filter = filter + '&nif=' + filters.nif;
  }
  if (filters && filters.phone) {
    filter = filter + '&phone=' + filters.phone;
  }
  if (filters && filters.rol) {
    filter = filter + '&rol=' + filters.rol;
  }
  if (filters && filters.population) {
    filter = filter + '&population=' + filters.population;
  }
  if (filters && filters.isActive) {
    filter = filter + '&isActive=' + filters.isActive;
  }
  if (filters && filters.isVerified) {
    filter = filter + '&isVerified=' + filters.isVerified;
  }

  return filter;
};
