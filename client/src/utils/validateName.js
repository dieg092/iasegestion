const re = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;

export default name => {
  let invalidName = true;

  if (re.test(name)) {
    invalidName = false;
  }

  if (invalidName) {
    return `Carácteres no válidos`;
  }

  return;
};
