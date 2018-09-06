import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import LoginForm from './login/LoginForm';
import RequestForm from './request/RequestForm';

class ModalClientAccess extends Component {
  onCloseModal() {
    this.props.closeModal('modal-client-access')
  }

  onRequestAccess() {
    this.props.requestAccessModal();
  }

  onRememberPass() {
    this.props.rememberPass();
  }

  render() {
    return (
      <div id="client-access">
        <div id="modal-client-access" className="modal">
          <div className="container-body">
            <div className="modal-content">
              <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.onCloseModal.bind(this)}>clear</i>
              <div className="body-login">
                <div className="row">
                  <div className="col s12 xl6 container-request">
                    <p className="margin-bottom-20 font-35-custom margin-top-0 center">Solicitud de Acceso</p>
                    <RequestForm clientAccess={true}/>
                  </div>
                  <div className="col s12 xl6 padding-y-10 container-login">
                    <p className="margin-bottom-20 font-35-custom margin-top-0 center">Iniciar Sesión</p>
                    <LoginForm clientAccess={true}/>
                    <div className="center padding-top-60">
                      <a className="teal-text pointer" onClick={this.onRememberPass.bind(this)}>¿Has olvidado tu contraseña?</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(null, actions)(ModalClientAccess);
