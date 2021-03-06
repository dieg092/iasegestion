//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { compose } from "redux";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import axios from 'axios';
import AdminFiscal from './AdminFiscal';
import UserForm from './users/UserForm';
import ModalResendPass from './users/ModalResendPass';
import ModalNoDigitalSignature from './users/ModalNoDigitalSignature';
import ModalInvalidData from './users/ModalInvalidData';
import ModalResendAccess from './users/ModalResendAccess';
import * as actions from '../../actions';

class User extends Component {
  constructor(props) {
      super(props);

      this.state = {
        user: null
      }
  }

  componentDidMount(){
    const userId = this.props.history.location.pathname.split('/')[3];
    axios.get('/api/usuarios/' + userId)
      .then((response) => {
        if (response.data[0]) {
          this.props.userData(response);
          this.setState({
            user: response
          })
        } else {
          window.history.go(-1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
        <div className="admin-container">
          <div className="row">
            <div className="col m8 offset-m2 s12 darken-1">
              <h2 className="header center">Edición de Usuario</h2>
              {this.state.user &&
                <div>
                  <UserForm />
                  <ModalResendPass />
                  <ModalNoDigitalSignature />
                  <ModalInvalidData />
                  <ModalResendAccess />
                  <div className="margin-top-20" style={{ borderTop: '1px solid black' }}>
                    <AdminFiscal />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({
    form: 'userForm',
  })
)(User);
