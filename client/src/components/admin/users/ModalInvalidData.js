import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';

class ModalInvalidData extends Component {
  closeModal() {
    this.props.closeModal('modal-delete-user');
  }

  onDeleteClick() {
    this.props.deleteUser(this.props.userSelected, this.props.history);
  }

  render() {
    return (
      <div id="success-request">
        <div id="modal-delete-user" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <h4>Eliminar PDF y Usuario</h4>
              <h6>Usar cuando la información del PDF es incorrecta.</h6>
              <h6>Se enviará automaticamente un correo al usuario solicitando que rellene correctamente la solicitud de información.</h6>
              <h5>¿Estás seguro de que deseas Eliminar el PDF y el Usuario?</h5>
              <div className="card-content margin-top-28">
                <button className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15 left" onClick={this.closeModal.bind(this)}>
                  Cancelar
                </button>
                <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15 margin-left-50 right" onClick={() => {this.onDeleteClick()}}>
                  Eliminar y enviar correo
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

export default connect(mapStateToProps, actions)(withRouter(ModalInvalidData));
