const CONSTANTS = require('../../../utils/constants');
let document_types = [];

Object.keys(CONSTANTS.DOCUMENT_TYPE).map((doc) => {
  document_types.push(doc)
});

export default [
  { label: 'Tipo de Documento', name: 'type', type: 'select', options: document_types },
  { label: 'Nº modelo', name: 'number', type: 'text', options: null },
  { label: 'Nombre', name: 'documentName', type: 'text', options: null },
  { label: 'Cliente', name: 'client', type: 'text', noValueError: 'Campo Cliente vacío', class: 'autocomplete', options: null },
];
