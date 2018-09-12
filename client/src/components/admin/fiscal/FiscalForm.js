import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/autocomplete';
import M from "materialize-css/dist/js/materialize.min.js";
import AuthField from './AuthField';
import formFields from './formFields';
import formTaxFields from './formTaxFields';
import * as actions from '../../../actions';
import { POPULATION } from '../../../utils/population';

import { EditorConvertToHTML } from '../../../utils/EditorConvertToHTML';

window.jQuery = $;

class FiscalForm extends Component {
  state = { file: null };

  componentDidMount() {
    if (this.props.postSelected) {
      this.handleInitialize();
    }

    const elems = document.querySelectorAll('.modal');
    const elem = document.querySelectorAll('select');

    M.Modal.init(elems, {});
    M.FormSelect.init(elem, {});
  }

  handleInitialize() {
    const initData = {
      "postTitle": this.props && this.props.postSelected && this.props.postSelected.title,
      "category": this.props && this.props.postSelected && this.props.postSelected.category,
      "altPost": this.props && this.props.postSelected && this.props.postSelected.alt,
    };
    this.props.initialize(initData);
  }


  renderFields() {
    return _.map(formFields, ({ label, name, type, icon, options }) => {
      if (options) {
        AuthField.value = this.props.postSelected && this.props.postSelected.category

      }
      return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField} selected={this.props.postSelected && this.props.postSelected}/>
    });
  }

  renderTaxFields() {
    return _.map(formTaxFields, ({ label, name, type, icon, options }) => {
      return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField}/>
    });
  }

  renderOtherFields() {

  }

  onSubmitFiscal() {
    const mainPhoto = document.getElementById("principalPhotoFiscal").value;

    let edit = false;

    if (this.props.postSelected) {
      edit = true;
    }

    if (edit) {
      this.props.submitFiscal(this.props.fiscalForm.values, this.state.file, mainPhoto, this.props.history, edit, this.props.postSelected);
    } else {
      this.props.submitFiscal(this.props.fiscalForm.values, this.state.file, mainPhoto, this.props.history, edit);
    }
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  loadPopulations() {
    $('input.autocomplete').autocomplete({
        source: (request, response) => {
          $.ajax({
           url: "/api/usuariosSearch",
           dataType: "json",
           type: "get",
           data: {
             email: request.term,
             name: request.term,
             lastName: request.term,
             nif: request.term
           },
           success: ( data ) => {
             console.log(data)
             response( data);
           },
           error: ( err ) => {
             console.log('errror')
             console.log(err)
           }
         });
      },
      select: (event, ui) => {
        console.log(ui)
        const text = ui.item.email;

        $('input.autocomplete').val(text);
        event.preventDefault();
      },
      minLength: 2,
    });
  }

  render() {
    return (
       <form onSubmit={this.props.handleSubmit(this.onSubmitFiscal.bind(this))}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div className="col s12 margin-top-20">
                  {this.renderFields()}
                  {$('select[name=type] option:selected').text() === '' || $('select[name=type] option:selected').text() === 'Impuesto' ?
                    this.renderTaxFields()
                  :
                    this.renderOtherFields()
                  }
                  {this.loadPopulations()}
                  <div className="col s12">
                     <div className="file-field input-field">
                       <h6>Foto Principal</h6>
                         <div className="btn">
                            <span>Explorar</span>
                            <input
                              onChange={this.onFileChange.bind(this)}
                              type="file"
                              accept="image/*"
                            />
                         </div>

                         <div className="file-path-wrapper">
                            <input id="principalPhotoFiscal" className="file-path validate" type="text"
                               placeholder="Elegir imágen principal"
                               value={this.state.file ? this.state.file.title : (this.props.postSelected && this.props.postSelected.mainPhoto ? this.props.postSelected.mainPhoto.split('/')[1] : '')}/>
                         </div>
                      </div>
                    </div>
                </div>
              </div>
              <div className="card-action">
                <div className="col s12 l3 left">
                  <Link to="/admin/fiscal-financiero" className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15">
                    Cancelar
                  </Link>
                </div>
                <div className="col s12 l3 left">
                  <button type="button" data-target="modal-delete-post" className="btn amber darken-1 waves-effect waves-light btn-flat white-text no-uppercase margin-top-15 modal-trigger">
                    Eliminar
                  </button>
                </div>
                <div className="col s12 l3 right">
                  <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15 ">
                    Guardar
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
  const fiscalForm = state.form.fiscalForm;
  const userLogged = state.auth.userLogged;
  const users  = state.user.users;
  //const fiscalSelected = state.fiscal.fiscalSelected;

  return { fiscalForm, userLogged, users };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'fiscalForm'
  })
)(withRouter(FiscalForm));
