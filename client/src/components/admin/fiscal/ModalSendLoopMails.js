import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class ModalSendLoopMails extends Component {
  closeModal() {
    this.props.closeModal('modal-send-loop-mails')
  }

  onSendLoopMail() {
    this.props.sendLoopMail(this.props.history);
  }

  render() {
    return (
      <div id="resend-request">
        <div id="modal-send-loop-mails" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <h4>Enviar correo a todos los clientes</h4>
              <h6>¿Estás seguro de que deseas enviar el correo informativo de los plazos de entrega a todos los Clientes?</h6>
              <div className="card-content margin-top-28">
                <button className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15 left" onClick={this.closeModal.bind(this)}>
                  Cancelar
                </button>
                <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15 margin-left-50 right" onClick={() => {this.onSendLoopMail()}}>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default connect(null, actions)(ModalSendLoopMails);
