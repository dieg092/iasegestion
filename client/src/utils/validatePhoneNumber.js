const re = /^[0-9\+]{1,}[0-9\-]{8,15}$/;

export default phone => {
  let invalidPhone = true;

  if (re.test(phone)) {
    invalidPhone = false;
  }

  if (invalidPhone) {
    return `Teléfono no válido`;
  }

  return;
};
