const CONSTANTS = require('../../../../utils/constants');
let categories = [];

Object.keys(CONSTANTS.CATEGORY).map((category) => {
  categories.push(category)
});

export default [
  { label: 'Título', name: 'postTitle', type: 'text', options: null },
  { label: 'Categoría', name: 'category', type: 'select', options: categories },
  { label: 'Alt', name: 'altPost', type: 'text', noValueError: 'Campo Alt vacío', options: null }
];
