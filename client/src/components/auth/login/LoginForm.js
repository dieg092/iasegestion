//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import AuthField from './AuthField';
import * as actions from '../../../actions';
import validateEmail from '../../../utils/validateEmail';
import formFields from './formFields';
import formFieldsClientAccess from './formFieldsClientAccess';

class LoginForm extends Component {
  renderFields() {
    let formF = formFields;
    if (this.props.clientAccess) {
      formF = formFieldsClientAccess;
    }
    return _.map(formF, ({ label, name, type, icon }) => {
      return <Field key={name} label={label} type={type} name={name} icon={icon} component={AuthField} />
    });
  }

  onSubmitLogin(event) {
    event.preventDefault();
    this.props.submitLogin(this.props.loginForm.values, this.props.history);
  }

  render() {
    return (
        <div>
          <form onSubmit={this.onSubmitLogin.bind(this)}>
            <div className="card-content">
              {this.renderFields()}
            </div>
            {this.props && this.props.errorLogin &&
                <p className="red-text">{this.props.errorLogin}</p>
            }
            <div className="card-action center col s12">
              <button type="submit" className="btn teal btn-flat white-text no-uppercase margin-top-15">
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmail(values.recipients || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  _.each(formFieldsClientAccess, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  const loginForm = state.form.loginForm;
  const errorLogin = state.auth.errorLogin;

  return { loginForm, errorLogin };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'loginForm',
    destroyOnUnmount: false
  })
)(withRouter(LoginForm));
// <p className="margin-left-7">
//   <label>
//     <input type="checkbox" />
//     <span>Recordar correo</span>
//   </label>
// </p>
