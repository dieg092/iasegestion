import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import RequestForm from './request/RequestForm';

class ModalRequest extends Component {
  closeModal() {
    this.props.closeModal('modal-request')
  }

  render() {
    return (
      <div id="request">
        <div id="modal-request" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <p className="margin-bottom-20 font-35-custom margin-top-0">Solicitud de Acceso</p>
              <RequestForm />
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default compose(
  connect(null, actions),
  reduxForm({
   form: 'requestForm'
  })
)(ModalRequest);
