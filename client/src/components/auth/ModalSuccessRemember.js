import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ModalSuccessRemember extends Component {
  closeModal() {
    this.props.closeModal('modal-success-remember');
  }

  render() {
    console.log(this.props)
    return (
      <div id="success-remember">
        <div id="modal-success-remember" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <h4>Regeneración de contraseña</h4>
              <div className="card-content margin-top-28">
                <h5>Hemos enviado un email de regeneración de contraseña a <span className="teal-text">{this.props.emailRemember}</span></h5>
                <h6 className="margin-top-28">Revise su bandeja de entrada y haga click en {"\"Regenerar contraseña\""}.</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps({ auth }) {
  const { emailRemember } = auth;
  return { emailRemember };
}

export default connect(mapStateToProps, actions)(ModalSuccessRemember);
