import React from 'react';
import { Card } from './common';
import $ from 'jquery';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

const NotFound = () => {
  return (
    <div className="margin-top-28">
      <div style={{ height: '39.86em' }}>
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo" role="img" alt="404" style={{ backgroundImage: 'url(/images/404.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: height }}>
          <h1 className="center padding-top-145 white-text font-title">ERROR 404</h1>
        </div>
        <div className="container center padding-300-custom">
          <Card
            title="NO SE ENCONRTÓ LA PÁGINA"
            body="Puede que la página solicitada ya no exista, haya cambiado de nombre o no esté disponible temporalmente."
          />
        </div>
      </div>
      <div >
        <Footer />
      </div>
    </div>
  );
};


export default NotFound;
