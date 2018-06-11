//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import AuthField from '../login/AuthField';
import validateEmail from '../../../utils/validateEmail';
import formFields from './formFields';
import * as actions from '../../../actions';

class RequestForm extends Component {
  onSubmitRequest() {
    this.props.submitRequest(this.props.requestForm.values, this.props.history);
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type, icon }) => {
      return <Field key={name} label={label} type={type} name={name} icon={icon} component={AuthField} />
    });
  }

  render() {
    console.log(this.props)
    return (
        <div>
          <form onSubmit={this.props.handleSubmit(this.onSubmitRequest.bind(this))}>
            <div className="card-content margin-top-28">
              {this.renderFields()}
            </div>
            {this.props && this.props.errores &&
              <p className="red-text">{this.props.errores}</p>
            }
            <div className="card-action center col s12">
              <button type="submit" className="btn teal btn-flat white-text no-uppercase margin-top-15">
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emailRequest = validateEmail(values.emailRequest || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  const errores  = state.auth.error;
  const requestForm = state.form.requestForm;

  return { requestForm, errores };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'requestForm',
    destroyOnUnmount: false
  })
)(withRouter(RequestForm));
