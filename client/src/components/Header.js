import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import ModalRequest from './auth/ModalRequest';
import ModalRememberPass from './auth/ModalRememberPass';
import ModalLogin from './auth/ModalLogin';
import ModalSuccessRequest from './auth/ModalSuccessRequest';
import ModalSuccessRemember from './auth/ModalSuccessRemember';
import ModalClientAccess from './auth/ModalClientAccess';

window.jQuery = $;

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
    const width = $( document ).width();
    if (width >= 993) {
      const elem = document.getElementsByClassName("sidenav");
      if (elem && elem[0]) {
          M.Sidenav.getInstance(elem[0]).close();
      }
    }

    return (
      <div className="header-absolute">
        <ModalRequest />
        <ModalClientAccess />
        <ModalRememberPass />
        <ModalLogin />
        <ModalSuccessRequest />
        <ModalSuccessRemember />
        <nav className="transparent">
          <div className="nav-wrapper nav-color">
            <a href="/"><img alt="iasegestion" className="brand-logo logo-header" src={'/images/logo.png'} /></a>
            <a data-target="menu" className="sidenav-trigger"><i className="material-icons margin-top-10 black-text">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li className={this.props.location.pathname === '/' && 'grey darken-3'}><a className={this.props.location.pathname === '/' ? 'white-text bold' : 'black-text'} href="/">Inicio</a></li>
              <li className={this.props.location.pathname === '/servicios' && 'grey darken-3'}><a className={this.props.location.pathname === '/servicios' ? 'white-text bold' : 'black-text'} href="/servicios">Servicios</a></li>
              <li className={this.props.location.pathname === '/blog' && 'grey darken-3'}><a className={this.props.location.pathname === '/blog' ? 'white-text bold' : 'black-text'} href="/blog">Blog</a></li>
              <li className={this.props.location.pathname === '/filosofia' && 'grey darken-3'}><a className={this.props.location.pathname === '/filosofia' ? 'white-text bold' : 'black-text'} href="/filosofia">Filosofía</a></li>
              <li className={this.props.location.pathname === '/quienes-somos' && 'grey darken-3'}><a className={this.props.location.pathname === '/quienes-somos' ? 'white-text bold' : 'black-text'} href="/quienes-somos">¿Quiénes somos?</a></li>
              <li className={this.props.location.pathname === '/contacto' && 'grey darken-3'}><a className={this.props.location.pathname === '/contacto' ? 'white-text bold' : 'black-text'} href="/contacto">Contacto</a></li>
              <li><a data-target="modal-client-access" className="modal-trigger black-text">Acceso Clientes</a></li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav pointer" id="menu">
          <li className={this.props.location.pathname === '/' && 'grey darken-3'}><a className={this.props.location.pathname === '/' ? 'white-text bold' : 'black-text'} href="/">Inicio</a></li>
          <li className={this.props.location.pathname === '/servicios' && 'grey darken-3'}><a className={this.props.location.pathname === '/servicios' ? 'white-text bold' : 'black-text'} href="/servicios">Servicios</a></li>
          <li className={this.props.location.pathname === '/blog' && 'grey darken-3'}><a className={this.props.location.pathname === '/blog' ? 'white-text bold' : 'black-text'}  href="/blog">Blog</a></li>
          <li className={this.props.location.pathname === '/filosofia' && 'grey darken-3'}><a className={this.props.location.pathname === '/filosofia' ? 'white-text bold' : 'black-text'} href="/filosofia">Filosofía</a></li>
          <li className={this.props.location.pathname === '/quienes-somos' && 'grey darken-3'}><a className={this.props.location.pathname === '/quienes-somos' ? 'white-text bold' : 'black-text'} href="/quienes-somos">¿Quiénes somos?</a></li>
          <li className={this.props.location.pathname === '/contacto' && 'grey darken-3'}><a className={this.props.location.pathname === '/contacto' ? 'white-text bold' : 'black-text'} href="/contacto">Contacto</a></li>
          <li><a data-target="modal-request" className="modal-trigger black-text">Solicitud Acceso</a></li>
          <li><a data-target="modal-login" className="modal-trigger black-text">Iniciar Sesión</a></li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Header);
