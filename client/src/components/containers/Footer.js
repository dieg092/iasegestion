import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImage } from '../containers/common';

class Footer extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <footer className="page-footer margin-top-125" id="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l4 s12">
              <h5 className="white-text margin-bottom-30">IASE Gestión</h5>
              <p className="grey-text text-lighten-4 justify">Pequeña descripción de la empresa. Un texto es una composición de signos codificados en un sistema de escritura que forma una unidad de sentido. También es una composición de caracteres imprimibles (con grafema) generados por un algoritmo de cifrado que, aunque no tienen sentido para cualquier persona. </p>
            </div>
            <div className="col l4 offset-l1 s12">
              <h5 className="white-text margin-bottom-30">Contáctanos</h5>
              <ul>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15"><i className="material-icons margin-right-12">location_on</i> Gran Vía, 36 - 50005 Zaragoza</li>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15"><i className="material-icons margin-right-12">mail_outline</i> informacion@iasegestion.com</li>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15"><i className="material-icons margin-right-12">phone</i> 976 232 771</li>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15"><i className="material-icons margin-right-12">phone</i> 976 238 481</li>
              </ul>
            </div>
            <div className="col l3 s12">
              <h5 className="white-text margin-bottom-30">Últimos Posts</h5>
              <ul>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15">Post 1</li>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15">Post 2</li>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15">Post 3</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
          © 2018 Copyright IASE gestión. Todos los derechos reservados


          <a className="grey-text text-lighten-4 right margin-left-15" href="/contacto">Contacto</a>
          <a className="grey-text text-lighten-4 right margin-left-15" href="#!">Términos de uso</a>
          <a className="grey-text text-lighten-4 right" href="#!">Política de privacidad</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default connect(null, actions)(Footer);