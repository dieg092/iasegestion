import React from 'react';
import { Card } from './common';
import $ from 'jquery';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

const RequestResend = () => {
  return (
    <div className="">
      <div style={{ height: '39.86em' }}>
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo" role="img" alt="reenviar" style={{ backgroundImage: 'url(/images/resend.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: height }}>
          <h1 className="center padding-top-145 white-text font-title">Solicitud expirada</h1>
        </div>

        <Card
          title="Tiempo de verificación expirado"
          body='Le hemos enviado un nuevo correo de verificación. Rebise su correo electrónico, haga click en \"Verificar tu cuenta \" y nuestros administradores activarán tu cuenta lo antes posible.'
        />
      </div>
      <div >
        <Footer />
      </div>
    </div>
  );
};


export default RequestResend;;
