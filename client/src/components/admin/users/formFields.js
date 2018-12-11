export default [
  // { label: 'Correo', name: 'email', type: 'text', noValueError: 'Campo correo vacio', options: null },
  { label: 'Empresa', name: 'businessName', type: 'text', options: null },
  { label: 'Adminsitrador', name: 'name', type: 'text', options: null },
  { label: 'Apellidos', name: 'lastName', type: 'text', noValueError: null, options: null },
  { label: 'NIF/CIF', name: 'nif', type: 'text', noValueError: 'Campo NIF/CIF vacío', options: null },
  { label: 'Personalidad jurídica', name: 'type', type: 'checkbox', noValueError: null, options: ['Persona física', 'Persona jurídica'] },
  { label: 'Teléfono', name: 'phone', type: 'text', options: null },
  { label: 'Fecha de nacimiento', name: 'birthDate', type: 'date', noValueError: null, options: null },
  { label: 'Población', name: 'population', type: 'text', noValueError: 'Campo Población vacío', class: 'autocomplete', options: null },
  { label: 'Rol', name: 'rol', type: 'checkbox', noValueError: null, options: ['Cliente', 'Administrador'] },

];
//https://codepen.io/yaennuuh/pen/eJVYoV
//https://materializecss.com/autocomplete.html //https://codepen.io/CarlBoneri/pen/oYojBZ
