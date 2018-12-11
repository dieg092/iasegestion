export default [
  { label: 'Nombre', name: 'nameContact', type: 'text', noValueError: 'Campo nombre vacío' },
  { label: 'Correo', name: 'emailContact', type: 'text', noValueError: 'Campo correo vacio', invalidMailError: 'Correo no válido' },
  { label: 'Mensaje', name: 'message', type: 'textarea', noValueError: 'Campo mensaje vacio' }
];
