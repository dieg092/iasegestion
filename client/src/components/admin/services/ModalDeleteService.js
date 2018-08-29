import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';

class ModaDeleteService extends Component {
  closeModal() {
    this.props.closeModal('modal-delete-service')
  }

  onDeleteClick() {
    this.props.deleteService(this.props.serviceSelected, this.props.history)
  }

  render() {
    return (
      <div id="resend-pass">
        <div id="modal-delete-service" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <h4>Eliminar servicio</h4>
              <h6>¿Estás seguro de que deseas eliminar el servicio <span className="primary-text">{this.props.serviceSelected.title}</span>?</h6>
              <div className="card-content margin-top-28">
                <button className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15 left" onClick={this.closeModal.bind(this)}>
                  Cancelar
                </button>
                <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15 margin-left-50 right" onClick={() => {this.onDeleteClick()}}>
                  Eliminar
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
  const serviceSelected = state.service.serviceSelected;

  return { serviceSelected };
}

export default connect(mapStateToProps, actions)(withRouter(ModaDeleteService));
