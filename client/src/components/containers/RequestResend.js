import React from 'react';
import { Card } from './common';

const RequestResend = () => {
  return (
    <div className="margin-top-28">
      <Card
        title="Tiempo de verificación expirado"
        body='Le hemos enviado un nuevo correo de verificación. Rebise su correo electrónico, haga click en \"Verificar tu cuenta \" y nuestros administradores activarán tu cuenta lo antes posible.'
      />
    </div>
  );
};


export default RequestResend;;
