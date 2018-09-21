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
      "name": this.props && this.props.userSelected && this.props.userSelected.name,
      "lastName": this.props && this.props.userSelected && this.props.userSelected.lastName,
      "nif": this.props && this.props.userSelected && this.props.userSelected.nif,
      "gender": this.props && this.props.userSelected && this.props.userSelected.gender,
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
                </div>
                {this.loadPopulations()}
              </div>
              <div className="card-action">
                <div className="col s12 l3 left">
                  <Link to="/admin/usuarios" className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15">
                    Cancelar
                  </Link>
                </div>
                <div className="col s12 l3 right">
                  <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15">
                    Guardar
                  </button>
                </div>
                <div className="col s12 l6 right">
                  <button type="button" data-target="modal-resend-pass" className="btn amber darken-1 waves-effect waves-light btn-flat white-text no-uppercase margin-top-15 modal-trigger">
                    Regenerar y reenviar Claves
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
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
