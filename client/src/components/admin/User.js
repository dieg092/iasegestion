//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { compose } from "redux";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import axios from 'axios';
import UserForm from './users/UserForm';
import ModalResendPass from './users/ModalResendPass';
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
        this.props.userData(response);
        this.setState({
          user: response
        })
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
