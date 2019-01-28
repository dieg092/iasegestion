import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';

class ModalNoDigitalSignature extends Component {
  closeModal() {
    this.props.closeModal('modal-delete-signature');
  }

  onDeleteClick() {
    this.props.deleteDigitalSignature(this.props.userSelected, this.props.history);
  }

  render() {
    return (
      <div id="success-request">
        <div id="modal-delete-signature" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <h4>Eliminar PDF (No está firmado)</h4>
              <h6>Usar cuando la información del PDF cliente es correcta, pero no está firmado digitalmente.</h6>
              <h6>Se enviará automaticamente un correo al cliente solicitando el PDF con la Firma.</h6>
              <h5>¿Estás seguro de que deseas Eliminar el PDF?</h5>
              <div className="card-content margin-top-28">
                <button className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15 left" onClick={this.closeModal.bind(this)}>
                  Cancelar
                </button>
                <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15 margin-left-50 right" onClick={() => {this.onDeleteClick()}}>
                  Eliminar y solicitar Firma
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

export default connect(mapStateToProps, actions)(withRouter(ModalNoDigitalSignature));
