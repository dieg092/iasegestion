//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import AuthField from '../../admin/users/AuthField';
import validateEmail from '../../../utils/validateEmail';
import validateID from '../../../utils/validateID';
import validatePhone from '../../../utils/validatePhoneNumber';
import validateName from '../../../utils/validateName';
import formFields from './formFields';
import formFieldsClientAccess from './formFieldsClientAccess';
import * as actions from '../../../actions';
import { autocompletePopulations } from '../../../utils/autocompletePopulations';
import { POPULATION } from '../../../utils/population';

window.jQuery = $;

class RequestForm extends Component {
  constructor(props) {
    super(props);

    this.state = { sendClicked: false, err: null };
  }

  componentDidMount() {
    const elem = document.querySelectorAll('.modal');
    M.Modal.init(elem, {});
  }

  onSubmitRequest(event) {
    event.preventDefault();

    const populate = POPULATION.find((element) => {
      if (element.label === this.props.requestForm.values.population || element.label === this.props.requestForm.values.population2) {
        return element.value;
      }
      return null;
    });

    if (this.props.requestForm.values && populate) {
      if ($("#termino").is(':checked') || $("#terminos").is(':checked')) {
        this.setState({ sendClicked: false });
        this.props.submitRequest(this.props.requestForm.values, this.props.history);
      } else {
        this.setState({ sendClicked: true });
      }
      this.setState({
        err: null
      });
    } else if (!populate) {
      this.setState({
        err: 'Selecciona una Población'
      });

    } else {
      this.setState({
        err: 'Rellene los campos'
      });
    }
  }

  renderFields() {
    let formF = formFields;
    if (this.props.clientAccess) {
      formF = formFieldsClientAccess;
    }

    return _.map(formF, ({ label, name, type, icon, options }) => {
      return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField} />
    });
  }

  onShowConditions(event) {
    event.preventDefault();
    this.props.showConditions();
  }

  render() {
    return (
        <div>
          <form onSubmit={this.onSubmitRequest.bind(this)}>
            <div className="card-content margin-top-28">
              {this.renderFields()}
              {autocompletePopulations()}
              <p className="margin-left-7">
                <label>
                  <input id={this.props.clientAccess ? 'terminos' : 'termino'} name="terminos" type="checkbox" />
                  <span style={{ cursor: 'default ' }}>Acepto los <a className="pointer" onClick={this.onShowConditions.bind(this)}>Términos y condicioes</a></span>
                </label>
              </p>
              {this.state.sendClicked && <p className="red-text">Tienes que aceptar los términos y condiciones</p>}
            </div>
            {this.props && this.props.errores &&
              <p className="red-text">{this.props.errores}</p>
            }
            {this.state.err &&
              <p className="red-text">{this.state.err}</p>
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
  errors.emailRequestAccess = validateEmail(values.emailRequestAccess || '');
  errors.nif = validateID(values.nif || '') ? false : 'Formato NIF/CIF Erroneo';
  errors.nif2 = validateID(values.nif2 || '') ? false : 'Formato NIF/CIF Erroneo';
  errors.phone = validatePhone(values.phone || '');
  errors.phone2 = validatePhone(values.phone2 || '');
  errors.name = validateName(values.name || '');
  errors.name2 = validateName(values.name2 || '');
  errors.lastName = validateName(values.lastName || '');
  errors.lastName2 = validateName(values.lastName2 || '');

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
