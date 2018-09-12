import axios from 'axios';
import { FETCH_FISCAL, FISCAL_CREATED, FISCAL_CLICKED, FISCAL_DELETED,
   FISCAL_OTHERS } from './types';

export const submitFiscal = (values, file, mainPhoto, history, edit, fiscalSelected) => async dispatch => {
  console.log(values)
  console.log(file)
  console.log(mainPhoto)
  let message = 'Error al guardar';
  let uploadConfig = '';
  let res = '';

  if (file) {
    uploadConfig = await axios.get('/api/upload?folder=documents&type=application/pdf');

    await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });
  }


  // if (fiscalSelected && file && fiscalSelected.mainPhoto.split('/')[1] !== file.name) {
  //   await axios.delete('/api/delete?key=' + fiscalSelected.mainPhoto);
  // }
  console.log(uploadConfig)
  const allValues = {
    name: values.documentName,
    number: values.number ? values.number : '',
    type: values.type ? values.type : false,
    pdf: uploadConfig.data && uploadConfig.data.key ? uploadConfig.data.key : ''
  }

  if (edit) {
    res = await axios.post('/api/fiscal-financiero/' + history.location.pathname.split('/')[3], allValues);
  } else {
    res = await axios.post('/api/fiscal-financiero', allValues);
  }


  if (res.statusText !== 'ERROR'  && res.statusText !== 'ERROR NAME') {
    if (edit) {
      message = 'Documento editado';
    } else {
      message = 'Documento creado';
    }

    history.push('/admin/fiscal-financiero');
  }
  if (res.statusText === 'ERROR NAME') {
    message = 'Nombre ya en uso.';
  }

  window.M.toast({html: message, classes: 'rounded'})

  dispatch({
    type: FISCAL_CREATED
  });
}
