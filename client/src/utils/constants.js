module.exports = {
  CATEGORY: {
    'Actualidad': 'Actualidad',
    'Destacados': 'Destacados'
  },
  DOCUMENT_TYPE: {
    'Balance': 'Balance',
    'Cuenta de explotación': 'Cuenta de explotación',
    'Informe': 'Informe'
  },
  URL: {
    'photo' : !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'https://s3.eu-west-3.amazonaws.com/iase-test/' : 'https://s3.eu-west-3.amazonaws.com/iasegestion-bucket/'
  }
};
