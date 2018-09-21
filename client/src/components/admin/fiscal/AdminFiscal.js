import React, { Component } from 'react';
import { compose } from "redux";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FiscalForm from './FiscalForm';
import * as actions from '../../../actions';

class AdminFiscal extends Component {
  renderTypeDoc() {
    if (this.props.docSelected && this.props.docSelected.type !== 'Impuesto') {
      return(
        'Documento'
      )
    } else {
      if (this.props.docSelected || this.props.history.location.pathname.split('/')[3] === 'nuevo-impuesto') {
        return(
          'Impuesto'
        )
      } else {
        return(
          'Documento'
        )
      }
    }
  }
  render() {
    return (
        <div className="admin-container">
          <div className="row">
            <div className="col m8 offset-m2 s12 darken-1">
              <h2 className="header center">{this.props.location.pathname === '/admin/fiscal-financiero/nuevo' || this.props.location.pathname === '/admin/fiscal-financiero/nuevo-impuesto' ? 'Nuevo ' : 'Editar '} {this.renderTypeDoc()}</h2>
                <div>
                  <FiscalForm />
                </div>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const userSelected  = state.user.userSelected;
  const docSelected = state.doc.docSelected;
  return { userSelected, docSelected };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'fiscalForm',
  })
)(withRouter(AdminFiscal));
