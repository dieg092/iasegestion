import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ConditionsContent from '../containers/ConditionsContent';

class ModalConditions extends Component {
  closeModal() {
    this.props.closeModal('modal-conditions');
  }

  render() {
    return (
      <div id="conditions">
        <div id="modal-conditions" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <ConditionsContent />
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default connect(null, actions)(ModalConditions);
