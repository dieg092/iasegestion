export default [
  { label: 'Correo', name: 'emailRequest', type: 'text', icon: 'mail_outline', noValueError: 'Campo correo vacio', invalidMailError: 'Correo no válido'},
  { label: 'Empresa', name: 'businessName2', type: 'text', options: null },
  { label: 'Nombre Adminsitrador', name: 'name2', type: 'text', options: null },
  { label: 'Apellidos Administrador', name: 'lastName2', type: 'text', noValueError: null, options: null },
  { label: 'NIF/CIF', name: 'nif2', type: 'text', noValueError: 'Campo NIF/CIF vacío', options: null, invalidNifError: 'Formato NIF/CIF erróneo' },
  { label: 'Personalidad jurídica', name: 'type2', type: 'checkbox', noValueError: null, options: ['Persona física', 'Persona jurídica'] },
  { label: 'Teléfono', name: 'phone2', type: 'text', options: null },
  { label: 'Población', name: 'population2', type: 'text', noValueError: 'Campo Población vacío', class: 'autocomplete', options: null }
];
