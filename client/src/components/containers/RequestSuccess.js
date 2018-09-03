import React from 'react';
import { Card } from './common';
import $ from 'jquery';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

const RequestSuccess = () => {
  return (
    <div className="margin-top-28">
      <div style={{ height: '39.86em' }}>
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo" style={{ backgroundImage: 'url(/images/mail.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: height }}>
          <h1 className="center padding-top-145 white-text font-title">Verificación correo</h1>
        </div>
        <Card
          title="Correo electrónico verificado"
          body="Nuestros administradores activarán tu cuenta lo antes posible. Recibirás un correo electrónico cuando esté todo listo."
        />
      </div>
      <div >
        <Footer />
      </div>
    </div>
  );
};


export default RequestSuccess;;
