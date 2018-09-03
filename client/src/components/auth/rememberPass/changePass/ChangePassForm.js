//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import AuthField from '../../login/AuthField';
import formFields from './formFields';
import * as actions from '../../../../actions';
import Footer from '../../../containers/Footer';

const height = $( window ).height() * 0.3;

class ChangePassForm extends Component {
  onSubmitRequest() {
    this.props.submitChangePass(this.props.changePassForm.values, this.props.history);
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
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo" style={{ backgroundImage: 'url(/images/password.jpg)', backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: 'cover', height: height }}>
          <h1 className="center padding-top-145 white-text font-title">Nueva contraseña</h1>
        </div>
          <div className="row">
            <div className="col m4 offset-m4 s12 darken-1">
              <form onSubmit={this.props.handleSubmit(this.onSubmitRequest.bind(this))}>
              <div className="card horizontal">
                <div className="card-stacked">
                  <div className="card-content">
                    <div className="col s12 margin-top-20">
                      {this.renderFields()}
                    </div>
                    {this.props && this.props.errores &&
                      <p className="red-text">{this.props.errores}</p>
                    }
                  </div>
                  <div className="card-action">
                    <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15 margin-left-50 right">
                      Guardar contraseña
                    </button>
                  </div>
                </div>
              </div>
            </form>
            </div>
          </div>
          <Footer />
        </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  const changePassForm = state.form.changePassForm;
  const errores = state.auth.errorChangePass;
  return { changePassForm, errores };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'changePassForm',
    destroyOnUnmount: false
  })
)(withRouter(ChangePassForm));
