import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';

class ModaDeletePost extends Component {
  closeModal() {
    this.props.closeModal('modal-delete-post')
  }

  onDeleteClick() {
    this.props.deletePost(this.props.postSelected, this.props.history)
  }

  render() {
    return (
      <div id="resend-pass">
        <div id="modal-delete-post" className="modal">
          <div className="modal-content container-body">
            <i className="material-icons left grey-text text-darken-2 pointer" onClick={this.closeModal.bind(this)}>clear</i>
            <div className="body-login">
              <h4>Eliminar servicio</h4>
              <h6>¿Estás seguro de que deseas eliminar el post <span className="primary-text">{this.props.postSelected.title}</span>?</h6>
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
  const postSelected = state.post.postSelected;

  return { postSelected };
}

export default connect(mapStateToProps, actions)(withRouter(ModaDeletePost));
