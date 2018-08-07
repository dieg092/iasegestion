import axios from 'axios';
import { FETCH_USERS, USER_CLICKED, USER_CHANGE_STATE, USER_SAVED } from './types';
import M from "materialize-css/dist/js/materialize.min.js";
import { POPULATION } from '../utils/population';

export const submitService = (values, file, mainPhoto, editor) => async dispatch => {
  if (file) {
    const uploadConfig = await axios.get('/api/upload');

    const upload = await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });
  }

  const allValues = {
    title: values.serviceTitle,
    shortDescription: values.shortDescription,
    mainPhoto: mainPhoto ? mainPhoto : '',
    editor: editor
  }
  const res = await axios.post('/api/service', allValues);
  console.log(res)

  dispatch({
    type: USER_SAVED
  });
}
