export default [
  { label: 'Correo', name: 'email', type: 'text', noValueError: 'Campo correo vacio', options: null },
  { label: 'Población', name: 'population', type: 'text', class: 'autocomplete', options: null },
  { label: 'Nombre', name: 'name', type: 'text', options: null },
  { label: 'Apellidos', name: 'lastName', type: 'text', options: null },
  { label: 'NIF/CIF', name: 'nif', type: 'text', options: null },
  //{ label: 'Fecha de nacimiento', name: 'birthDate', type: 'date', noValueError: null, options: null }
  { label: 'Rol', name: 'rol', type: 'select', options: ['Cliente', 'Administrador'] },
  { label: 'Género', name: 'gender', type: 'select', options: ['Masculino', 'Femeníno'] },
  { label: 'Estado', name: 'isActive', type: 'select', options: ['Activado', 'Desactivado'] },
  { label: 'Verificado', name: 'isVerified', type: 'select', options: ['Si', 'No'] }
];
//https://codepen.io/yaennuuh/pen/eJVYoV
//https://materializecss.com/autocomplete.html //https://codepen.io/CarlBoneri/pen/oYojBZ
