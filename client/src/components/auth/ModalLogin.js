import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import LoginFormModal from './login/LoginForm';

class ModalLogin extends Component {
  onCloseModal() {
    this.props.closeModal('modal-login')
  }

  onRequestAccess() {
    this.props.requestAccessModal();
  }

  onRememberPass() {
    this.props.rememberPass();
  }

  render() {
    return (
      <div id="login">
        <div id="modal-login" className="modal">
          <div className="container-body">
            <div className="modal-content">
              <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.onCloseModal.bind(this)}>clear</i>
              <div className="body-login">
                <p className="margin-bottom-20 font-35-custom margin-top-0">Iniciar Sesión</p>
                <LoginFormModal />
                <div className="center margin-top-10">
                  <a className="teal-text pointer" onClick={this.onRememberPass.bind(this)}>¿Has olvidado tu contraseña?</a>
                </div>
                <div className="center request-access">
                  <span>¿No tienes cuenta?<a className="teal-text pointer bold" onClick={this.onRequestAccess.bind(this)}> Solicitar Acceso</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(null, actions)(ModalLogin);
