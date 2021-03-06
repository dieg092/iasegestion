import React from 'react';
import { Card } from './common';
import $ from 'jquery';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

const NotFound = () => {
  return (
    <div className="margin-top-28">
      <div className="height-adjust">
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo image-header image-404" role="img" alt="404" style={{ height: height }}>
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
