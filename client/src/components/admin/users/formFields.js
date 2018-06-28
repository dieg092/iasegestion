export default [
  // { label: 'Correo', name: 'email', type: 'text', noValueError: 'Campo correo vacio', options: null },
  { label: 'Nombre', name: 'name', type: 'text', noValueError: 'Campo nombre vacío', options: null },
  { label: 'Apellidos', name: 'lastName', type: 'text', noValueError: null, options: null },
  { label: 'NIF/CIF', name: 'nif', type: 'text', noValueError: 'Campo NIF/CIF vacío', options: null },
  { label: 'Género', name: 'gender', type: 'checkbox', noValueError: null, options: ['Masculino', 'Femeníno'] },
  { label: 'Fecha de nacimiento', name: 'birthDate', type: 'date', noValueError: null, options: null },
  { label: 'Población', name: 'population', type: 'text', noValueError: 'Campo Población vacío', class: 'autocomplete', options: null },
  { label: 'Rol', name: 'rol', type: 'checkbox', noValueError: null, options: ['Cliente', 'Administrador'] },

];
//https://codepen.io/yaennuuh/pen/eJVYoV
//https://materializecss.com/autocomplete.html //https://codepen.io/CarlBoneri/pen/oYojBZ
