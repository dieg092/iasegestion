//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import AuthField from './AuthField';
import validateEmail from '../../../utils/validateEmail';
import formFields from './formFields';

class LoginForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type, icon }) => {
      return <Field key={name} label={label} type={type} name={name} icon={icon} component={AuthField} />
    });
  }

  render() {
    return (
        <div>
          <form>
            <div className="card-content">
              {this.renderFields()}
              <p className="margin-left-7">
                <label>
                  <input type="checkbox" />
                  <span>Recordar correo</span>
                </label>
              </p>
            </div>
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


  return errors;
}

export default reduxForm({
  validate,
  form: 'loginForm',
  destroyOnUnmount: false
})(LoginForm);
