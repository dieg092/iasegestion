import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import RememberForm from './rememberPass/RememberForm';

class ModalRememberPass extends Component {
  closeModal() {
    this.props.closeModal('modal-remember')
  }

  render() {
    return (
      <div id="remember">
        <div id="modal-remember" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <h4>He olvidado mi Contraseña</h4>
              <RememberForm />
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
)(ModalRememberPass);
