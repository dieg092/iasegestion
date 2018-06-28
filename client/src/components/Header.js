import React, { Component } from 'react';
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
      <div>
        <ModalRequest />
        <ModalRememberPass />
        <ModalLogin />
        <ModalSuccessRequest />
        <ModalSuccessRemember />
        <nav>
          <div className="nav-wrapper">
            <img href="/" className="brand-logo" style={{ width: '175px', marginLeft: '20px', marginTop: '7px' }} src="http://iasegestion.com/templates/siteground/images/summer/joomla_logo.png" />
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a data-target="modal-request" className="modal-trigger">Solicitud Acceso</a></li>
              <li><a data-target="modal-login" className="modal-trigger">Iniciar Sesión</a></li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li><a data-target="modal-request" className="modal-trigger">Solicitud Acceso</a></li>
          <li><a data-target="modal-login" className="modal-trigger">Iniciar Sesión</a></li>
        </ul>
      </div>
    );
  }
}

export default Header;
