import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImage } from '../containers/common';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

class AboutUs extends Component {

  render() {
    return (
      <div>
        <div className="margin-bottom-75 margin-top-42-negative" style={{ backgroundImage: 'url(/images/building.png)', backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: '100%', height: height }}>
          <h1 className="center padding-top-145 white-text">Sobre nosotros</h1>
        </div>
        <div className="container">
          <div className="row valign-wrapper">
            <div className="col s12 m6">
              <img src="https://images.unsplash.com/photo-1518081461904-9d8f136351c2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8a815e999d0f593c8c8bbcb6473b0d39&auto=format&fit=crop&w=1977&q=80"  style={{ backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: '100%', height: '100%'   }}/>
            </div>
            <div className="col s12 m6 padding-left-30 font-18-custom">
              <p>IASE GESTION se define como un <span className="bold">DESPACHO PROFESIONAL</span>, como una empresa <span className="bold">MULTIDISCIPLINAR</span> de asesoría, consultaría, y gestión empresarial, dedicada a Grandes Empresas, Pymes, Microempresas y Autónomos.</p>

              <p><span className="bold">MAS DE 20 AÑOS DE EXPERIENCIA. Llevamos más de veinte años prestando eficazmente, a nivel nacional, asesoramiento jurídico, fiscal, laboral y contable a profesionales, PYMES y grandes empresas. Nuestra gestión está avalada por una dilatada experiencia.</span></p>

              <p>Pequeños pero Estamos asociados. <span className="bold">Esta  asociación nos hace GRANDES.</span></p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, actions)(AboutUs);
