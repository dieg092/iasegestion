import React, { Component } from 'react';
import { compose } from "redux";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import FiscalForm from './FiscalForm';
import * as actions from '../../../actions';

class AdminFiscal extends Component {
  render() {
    return (
        <div className="admin-container">
          <div className="row">
            <div className="col m8 offset-m2 s12 darken-1">
              <h2 className="header center">{this.props.location.pathname === '/admin/fiscal-financiero/nuevo' ? 'Nuevo ' : 'Editar '} Documento</h2>
                <div>
                  <FiscalForm />
                </div>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps({user}) {
  const { userSelected } = user;
  return { userSelected };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'fiscalForm',
  })
)(AdminFiscal);
