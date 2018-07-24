import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import ModalRequest from './auth/ModalRequest';
import ModalRememberPass from './auth/ModalRememberPass';
import ModalLogin from './auth/ModalLogin';
import ModalSuccessRequest from './auth/ModalSuccessRequest';
import ModalSuccessRemember from './auth/ModalSuccessRemember';

class Header extends Component {
  componentDidMount() {
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem,
      {
        edge: "left",
        inDuration: 250
      }
    );

    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  render() {
    return (
      <div className="header-absolute">
        <ModalRequest />
        <ModalRememberPass />
        <ModalLogin />
        <ModalSuccessRequest />
        <ModalSuccessRemember />
        <nav className="transparent">
          <div className="nav-wrapper">
            <a href="/"><img className="brand-logo logo-header" src="http://iasegestion.com/templates/siteground/images/summer/joomla_logo.png" /></a>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons margin-top-10">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="/servicios">Servicios</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/filosofia">Filosofía</a></li>
              <li><a href="/quienes-somos">¿Quiénes somos?</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a data-target="modal-request" className="modal-trigger">Solicitud Acceso</a></li>
              <li><a data-target="modal-login" className="modal-trigger">Iniciar Sesión</a></li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li><a href="/servicios">Servicios</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/filosofia">Filosofía</a></li>
          <li><a href="/quienes-somos">¿Quiénes somos?</a></li>
          <li><a href="/contacto">Contacto</a></li>
          <li><a data-target="modal-request" className="modal-trigger">Solicitud Acceso</a></li>
          <li><a data-target="modal-login" className="modal-trigger">Iniciar Sesión</a></li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Header);
