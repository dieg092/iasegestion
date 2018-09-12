const CONSTANTS = require('../../../utils/constants');
let document_types = [];

Object.keys(CONSTANTS.DOCUMENT_TYPE).map((doc) => {
  document_types.push(doc)
});

export default [
  { label: 'Tipo de Documento', name: 'type', type: 'select', options: document_types },
  { label: 'Nombre', name: 'documentName', type: 'text', options: null },
  { label: 'Cliente', name: 'population', type: 'text', noValueError: 'Campo Cliente vacío', class: 'autocomplete', options: null },
];
