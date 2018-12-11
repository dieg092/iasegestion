//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import AuthField from './AuthField';
import * as actions from '../../actions';
import validateEmail from '../../utils/validateEmail';
import formFields from './formFields';

class ContactForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type, icon }) => {
      return <Field key={name} label={label} type={type} name={name} component={AuthField} />
    });
  }

  onSubmitContact() {
    this.props.submitContact(this.props.contactForm.values);
  }

  render() {
    return (
        <div>
          <form onSubmit={this.props.handleSubmit(this.onSubmitContact.bind(this))}>

              {this.renderFields()}

            {this.props && this.props.errorContact &&
                <p className="red-text">{this.props.errorContact}</p>
            }
            <div className="center">
              <button type="submit" className="btn teal btn-flat white-text no-uppercase margin-top-15 col s12">
                Enviar
              </button>
            </div>
          </form>
        </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emailContact = validateEmail(values.emailContact || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  const contactForm = state.form.contactForm;
  const errorContact = state.auth.errorContact;

  return { contactForm, errorContact };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'contactForm',
    destroyOnUnmount: false
  })
)(withRouter(ContactForm));
// <p className="margin-left-7">
//   <label>
//     <input type="checkbox" />
//     <span>Recordar correo</span>
//   </label>
// </p>
