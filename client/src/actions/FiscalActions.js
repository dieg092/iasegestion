import axios from 'axios';
import { FETCH_DOCS, DOC_CREATED, DOC_CLICKED, DOC_DELETED, TYPEDOC_CLICKED, DOC_SELECTED_CLEAN } from './types';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';

export const fetchDocs = (page, filters) => async dispatch => {
  const filter = filterDocs(filters);

  const res = await axios.get('/api/docs?page=' + page + '&filter=' + filter);

  dispatch({ type: FETCH_DOCS, payload: res.data });
};

export const newDoc = (history) => {
  history.push('/admin/fiscal-financiero/nuevo');

  return {
    type: TYPEDOC_CLICKED
  };
}
export const newTax = (history) => {
  history.push('/admin/fiscal-financiero/nuevo-impuesto');
  return {
    type: TYPEDOC_CLICKED
  };
}

export const docClicked = (doc, history) => async dispatch => {
  history.push('/admin/fiscal-financiero/' + doc.slug);

  return {
    type: DOC_CREATED,
    payload: null
  };
};
export const docNotSelected = () => {

  return {
    type: DOC_SELECTED_CLEAN,
    payload: null
  };
};

export const docData = (post) => {
  return {
    type: DOC_CLICKED,
    payload: post.data[0]
  };
};

export const newClicked = (type, history) => {
  history.push('/admin/fiscal-financiero/nuevo');

  return {
    type: TYPEDOC_CLICKED,
    payload: type
  };
}

export const deleteDoc = (doc, history) => async dispatch => {
  let message = 'Error al eliminar el documento';

  const deletePDF = await axios.delete('/api/delete?key=' + doc.pdf);

  if (deletePDF.statusText === 'OK') {
    const res = await axios.delete('/api/docs/' + doc._id);

    if (res.statusText !== 'ERROR') {
      message = 'Documento eliminado';

      let modal = document.getElementById('modal-delete-doc');

      M.Modal.getInstance(modal).close();

      history.goBack()
      dispatch({
        type: DOC_DELETED
      });
    }
  }

   window.M.toast({html: message, classes: 'rounded'});
}

export const submitFiscal = (values, file, namePDF, history, edit, userId, docSelected) => async dispatch => {
  let message = 'Error al guardar';
  const clientLastName = values.client.split(' ')[1];
  let uploadConfig = '';
  let res = '';
  let documentNameValidation = false;
  let fileN = '';

  if (file) {
    fileN = file.name;
    const fileName = fileN.split('.')[0].split('_')[0];

    if (fileName === clientLastName) {
      documentNameValidation = true

      uploadConfig = await axios.get('/api/upload?folder=documents&type=application/pdf');

      await axios.put(uploadConfig.data.url, file, {
        headers: {
          'Content-Type': file.type
        }
      });
    }
  } else {
    const fileName = namePDF.split('.')[0].split('_')[0];
    if (fileName === clientLastName) {
      documentNameValidation = true
    }
  }

 if (documentNameValidation) {
   const allValues = {
     name: values.documentName,
     number: values.number ? values.number : '',
     type: values.type ? values.type : 'Impuesto',
     pdf: uploadConfig.data && uploadConfig.data.key ? uploadConfig.data.key : '',
     namePDF: fileN,
     client: userId
   }

   if (edit) {
     res = await axios.post('/api/docs/' + history.location.pathname.split('/')[3], allValues);
   } else {
     res = await axios.post('/api/docs', allValues);
   }


   if (res.statusText !== 'ERROR'  && res.statusText !== 'ERROR NAME') {
     if (edit) {
       message = 'Documento editado';
     } else {
       message = 'Documento creado';
     }

     history.goBack();
   }
   if (res.statusText === 'ERROR NAME') {
     message = 'Nombre ya en uso.';
   }

 } else {
   message = 'El Primer Apellido del cliente debe coincidir con la Primera Palabra del nombre del fichero.';
 }

 window.M.toast({html: message, classes: 'rounded'})

  dispatch({
    type: DOC_CREATED
  });
}


export const filterDocs = (filters) => {
  let filter = "";
  if (filters && filters.type) {
    filter = filter + '&type=' + filters.type;
  }
  if (filters && filters.number) {
    filter = filter + '&number=' + filters.number;
  }
  if (filters && filters.documentName) {
    filter = filter + '&name=' + filters.documentName;
  }
  if (filters && filters.clientFilter) {
    filter = filter + '&client=' + filters.clientFilter;
  } else if (filters && filters.client) {
    filter = filter + '&client=' + filters.client;
  }


  return filter;
};
