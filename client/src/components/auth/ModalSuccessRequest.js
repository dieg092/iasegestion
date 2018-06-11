import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ModalSuccessRequest extends Component {
  closeModal() {
    this.props.closeModal('modal-success-request');
  }

  render() {
    return (
      <div id="success-request">
        <div id="modal-success-request" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <h4>Verifíción de Correo electrónico</h4>
              <div className="card-content margin-top-28">
                <h5>Hemos enviado un email de verificación a <span className="teal-text">{this.props.emailRequest}</span></h5>
                <h6 className="margin-top-28">Revise su bandeja de entrada y verfique su cuenta haciendo click en {"\"verificar\""}.</h6>
                <h6>Una vez verficado el correo, nuestros administradores activarán tu cuenta lo antes posible.</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps({ auth }) {
  const { emailRequest } = auth;
  return { emailRequest };
}

export default connect(mapStateToProps, actions)(ModalSuccessRequest);
