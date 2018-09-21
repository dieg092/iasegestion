const CONSTANTS = require('../../../../utils/constants');
let document_types = [];
document_types.push('Impuesto');
Object.keys(CONSTANTS.DOCUMENT_TYPE).map((doc) => {
  document_types.push(doc)
});

export default [
  { label: 'Tipo de Documento', name: 'type', type: 'select', options: document_types },
  { label: 'Nº modelo', name: 'number', type: 'text', options: null },
  { label: 'Nombre', name: 'documentName', type: 'text', options: null }
];
