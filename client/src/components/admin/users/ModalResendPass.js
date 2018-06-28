import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';

class ModalResendPass extends Component {
  closeModal() {
    this.props.closeModal('modal-resend-pass')
  }

  onRegenerateClick() {
    this.props.regeneratePass(this.props.userSelected._id)
  }

  render() {
    return (
      <div id="resend-pass">
        <div id="modal-resend-pass" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <h4>Regenerar y Reenviar Contraseña</h4>
              <h6>¿Estás seguro de que deseas Regenerar y Reenviar la contraseña de este usuario?</h6>
              <div className="card-content margin-top-28">
                <button className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15 left" onClick={this.closeModal.bind(this)}>
                  Cancelar
                </button>
                <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15 margin-left-50 right" onClick={() => {this.onRegenerateClick()}}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  const userSelected = state.user.userSelected;

  return { userSelected };
}

export default connect(mapStateToProps, actions)(ModalResendPass);
