import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/autocomplete';
import M from "materialize-css/dist/js/materialize.min.js";
import AuthField from './AuthField';
import formFields from './formFields';
import * as actions from '../../../actions';
import { POPULATION } from '../../../utils/population';
import CONSTANTS from '../../../utils/constants';
import validateID from '../../../utils/validateID';


window.jQuery = $;

class UserForm extends Component {
  componentDidMount() {
    this.handleInitialize();

    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  handleInitialize() {
    const population = POPULATION.find((element) => {
      if (element.value === this.props.userSelected._population) {
        return element.label;
      }

      return null;
    });

    const initData = {
      "email": this.props && this.props.userSelected && this.props.userSelected.email,
      "businessName": this.props && this.props.userSelected && this.props.userSelected.businessName,
      "name": this.props && this.props.userSelected && this.props.userSelected.name,
      "lastName": this.props && this.props.userSelected && this.props.userSelected.lastName,
      "nif": this.props && this.props.userSelected && this.props.userSelected.nif,
      "phone": this.props && this.props.userSelected && this.props.userSelected.phone,
      "type": this.props && this.props.userSelected && this.props.userSelected.type,
      "birthDate": this.props && this.props.userSelected && this.props.userSelected.birthDate,
      "population": this.props && this.props.userSelected && population && population.label ? population.label : '',
      "rol": this.props && this.props.userSelected && this.props.userSelected.rol
    };

    this.props.initialize(initData);
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type, icon, options }) => {
      return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField} />
    });
  }

  renderState() {
    if (this.props.userSelected && this.props.userSelected.isActive) {
      return (
        <a
          className="waves-effect waves-light btn margin-bottom-20 right green"
          onClick={() => { this.onChangeState(true) }}
        >
          <i className="material-icons left">person</i>
          ACTIVADO
        </a>
      );
    }

    return (
      <a
        className="waves-effect waves-light btn margin-bottom-20 right red"
        onClick={() => { this.onChangeState(false) }}
      >
        <i className="material-icons left">person</i>
        DESACTIVADO
      </a>
    );
  }

  onSubmitUser() {
    this.props.submitUser(this.props.userSelected._id, this.props.userForm.values);
  }

  onChangeState(state) {
    this.props.changeState(this.props.userSelected, state, this.props.history)
  }

  onRegenerateClick() {
    this.props.regeneratePass(this.props.userSelected._id)
  }

  loadPopulations() {
    $('input.autocomplete').autocomplete({
      source: (request, response) => {
        const results = $.ui.autocomplete.filter(POPULATION, request.term);
        response(results.slice(0, 6));
      },
      select: (event, ui) => {
        const text = ui.item.label;

        $('input.autocomplete').val(text);
        event.preventDefault();
      },
      minLength: 2,
      messages: {
        noResults: '',
        results: function() {}
      }
    });
  }

  render() {
    return (
       <form onSubmit={this.props.handleSubmit(this.onSubmitUser.bind(this))} style={{ marginBottom: '60px' }}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div className="col xl4 l12 m12 s12 margin-top-10 right">
                  {this.renderState()}
                </div>
                <p className="col xl8 l12 m12 s12 underline resizeTitle titleUser">{this.props.userSelected && this.props.userSelected.email}</p>
                <div className="col s12 margin-top-20">
                  {this.props.userSelected && this.renderFields()}
                  <div className="input-field">
                     <label>PDF Firma Digital</label>
                  </div>
                  {this.props.userSelected && this.props.userSelected.digitalSignature ?
                    <div className="left margin-top-50 row col s12">
                      <div className="col s5">
                        <a target="_blank" href={CONSTANTS.URL.photo + this.props.userSelected.digitalSignature}>
                           <img src="/images/icono-pdf.png" alt="pdf" className="responsive-img" style={{ maxWidth: '90px' }} />
                        </a>
                      </div>
                      <div className="col s7">
                        <button type="button" data-target="modal-delete-signature" className="btn red btn-flat waves-effect waves-light white-text no-uppercase col s12 modal-trigger">
                          Eliminar (No Firmado)
                        </button>
                        <button type="button" data-target="modal-delete-user" className="btn red btn-flat waves-effect waves-light white-text no-uppercase col s12 margin-top-15 modal-trigger">
                          Eliminar (Usuario)
                        </button>
                      </div>
                    </div>
                  :
                    <div className="margin-top-50">
                      <p className="red-text">NO TIENE PDF FIRMADO</p>
                    </div>
                  }
                </div>
                {this.loadPopulations()}
              </div>
              <div className="card-action">
                <div className="col s12 l3 left">
                  <Link to="/admin/usuarios" className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15">
                    Cancelar
                  </Link>
                </div>
                {this.props.userSelected && this.props.userSelected.email !== 'invitado@iasegestion.com' &&
                  <div>
                    <div className="col s12 l3 right">
                      <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15">
                        Guardar
                      </button>
                    </div>
                    {this.props.userSelected && !this.props.userSelected.digitalSignature &&
                      <div className="col s12 l6 right">
                        <button type="button" data-target="modal-resend-access" className="btn amber darken-1 waves-effect waves-light btn-flat white-text no-uppercase margin-top-15 modal-trigger">
                          Reenviar Solicitud Acceso
                        </button>
                      </div>
                    }

                    <div className="col s12 l6 right">
                      <button type="button" data-target="modal-resend-pass" className="btn amber darken-1 waves-effect waves-light btn-flat white-text no-uppercase margin-top-15 modal-trigger">
                        Regenerar y reenviar Claves
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </form>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.nif = validateID(values.nif || '') ? false : 'Formato NIF/CIF Erroneo';

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  const userSelected = state.user.userSelected;
  const userForm = state.form.userForm;

  return { userSelected, userForm };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'userForm'
  })
)(withRouter(UserForm));
