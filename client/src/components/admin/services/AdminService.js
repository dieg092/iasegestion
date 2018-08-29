import React, { Component } from 'react';
import { compose } from "redux";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import ServiceForm from './ServiceForm';
import * as actions from '../../../actions';

class AdminService extends Component {
  render() {
    return (
        <div className="admin-container">
          <div className="row">
            <div className="col m8 offset-m2 s12 darken-1">
              <h2 className="header center">{this.props.location.pathname === '/admin/servicios/nuevo' ? 'Nuevo ' : 'Editar '} Servicio</h2>
                <div>
                  <ServiceForm />
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
    form: 'serviceForm',
  })
)(AdminService);
