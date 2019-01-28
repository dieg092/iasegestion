export default [
  { label: 'Correo', name: 'emailRequestAccess', type: 'text', noValueError: 'Campo correo vacio', invalidMailError: 'Correo no válido'},
  { label: 'Empresa', name: 'businessName', type: 'text', options: null },
  { label: 'Nombre Adminsitrador', name: 'name', type: 'text', options: null },
  { label: 'Apellidos Administrador', name: 'lastName', type: 'text', noValueError: null, options: null },
  { label: 'NIF/CIF', name: 'nif', type: 'text', noValueError: 'Campo NIF/CIF vacío', options: null, invalidNifError: 'Formato NIF/CIF erróneo' },
  { label: 'Personalidad jurídica', name: 'type', type: 'checkbox', noValueError: null, options: ['Persona física', 'Persona jurídica'] },
  { label: 'Teléfono', name: 'phone', type: 'text', options: null },
  { label: 'Población', name: 'population', type: 'text', noValueError: 'Campo Población vacío', class: 'autocomplete', options: null }
];
