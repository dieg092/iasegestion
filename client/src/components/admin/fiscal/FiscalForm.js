import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/autocomplete';
import M from "materialize-css/dist/js/materialize.min.js";
import AuthField from './AuthField';
import formFields from './formFields';
import * as actions from '../../../actions';
import CONSTANTS from '../../../utils/constants';
import { EditorConvertToHTML } from '../../../utils/EditorConvertToHTML';

window.jQuery = $;

class FiscalForm extends Component {
  state = { file: null, user_id: null, pageNumber: 1, numPages: null };

  componentDidMount() {
    if (this.props.userSelected) {
      this.handleInitializeWithUser();
    }
    if (this.props.docSelected) {
      this.handleInitialize();
    }


    const elems = document.querySelectorAll('.modal');
    const elem = document.querySelectorAll('select');

    M.Modal.init(elems, {});
    M.FormSelect.init(elem, {});
  }

  handleInitialize() {
    const initData = {
      "type": this.props && this.props.docSelected && this.props.docSelected.type,
      "number": this.props && this.props.docSelected && this.props.docSelected.number,
      "documentName": this.props && this.props.docSelected && this.props.docSelected.name,
      "client": this.props && this.props.docSelected && this.props.docSelected.client[0].name + ' ' + this.props.docSelected.client[0].lastName
    };
    this.props.initialize(initData);
  }

  handleInitializeWithUser() {
    const initData = {
      // "type": this.props && this.props.docSelected && this.props.docSelected.type,
      // "number": this.props && this.props.docSelected && this.props.docSelected.number,
      // "documentName": this.props && this.props.docSelected && this.props.docSelected.name,
      "client": this.props && this.props.userSelected && this.props.userSelected.name + ' ' + this.props.userSelected.lastName
    };
    this.props.initialize(initData);
  }


  renderFields() {
    return _.map(formFields, ({ label, name, type, icon, options }) => {
      let tax = true;

      if (this.props.docSelected && this.props.docSelected.type !== 'Impuesto') {
        tax = false;
      } else if (this.props.docSelected || this.props.history.location.pathname.split('/')[3] === 'nuevo-impuesto'){
        tax = true;
      } else {
        tax = false;
      }

      if (options) {
        AuthField.value = this.props.docSelected && this.props.docSelected.type

      }
      return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField} tax={tax} selected={this.props.docSelected ? this.props.docSelected : ''} />
    });
  }

  onSubmitFiscal() {
    const namePDF = document.getElementById("principalPhotoFiscal").value;
    let edit = false;
    let userId = '';

    if (this.props.docSelected) {
      edit = true;
    }
    if (!this.props.docForm.values.number && !this.props.docForm.values.type) {
       this.props.docForm.values.type = 'Balance';
    }
    if (this.props.userSelected) {
      userId = this.props.userSelected._id;
    } else {
      userId = this.state.user_id;
    }

    if (edit) {
      this.props.submitFiscal(this.props.docForm.values, this.state.file, namePDF, this.props.history, edit, userId, this.props.docSelected);
    } else {
      this.props.submitFiscal(this.props.docForm.values, this.state.file, namePDF, this.props.history, edit, userId);
    }
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  loadClients() {
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
             response( data);
           },
           error: ( err ) => {
             console.log(err)
           }
         });
      },
      select: (event, ui) => {
        const text = ui.item.label;
        const value = ui.item.value;
        this.setState({
          user_id: value
        })

        $('input.autocomplete').val(text);
        event.preventDefault();
      },
      minLength: 2,
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
   this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
       <form onSubmit={this.props.handleSubmit(this.onSubmitFiscal.bind(this))}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div className="col s12 margin-top-20">
                  {this.renderFields()}
                  {this.loadClients()}
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
                               value={this.state.file ? this.state.file.title : (this.props.docSelected && this.props.docSelected.namePDF ? this.props.docSelected.namePDF : '')}/>
                         </div>
                         <div className="col s12">
                         {this.state.file ? this.state.file.title : (this.props.docSelected && this.props.docSelected.pdf ?
                            <a target="_blank" href={CONSTANTS.URL.photo + this.props.docSelected.pdf}>PDF</a>
                          :
                            ''
                          )}
                          </div>

                      </div>
                    </div>
                </div>
              </div>
              <div className="card-action">
                <div className="col s12 l3 left">
                  <button onClick={() => {this.props.history.goBack()}} className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15">
                    Cancelar
                  </button>
                </div>
                {this.props.docSelected &&
                  <div className="col s12 l3 left">
                    <button type="button" data-target="modal-delete-doc" className="btn amber darken-1 waves-effect waves-light btn-flat white-text no-uppercase margin-top-15 modal-trigger">
                      Eliminar
                    </button>
                  </div>
                }
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
  const docForm = state.form.docForm;
  const userLogged = state.auth.userLogged;
  const userSelected = state.user.userSelected;
  const users  = state.user.users;
  const docSelected = state.doc.docSelected;
  const docType = state.doc.docType;

  return { docForm, userLogged, users, docSelected, docType, userSelected };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'docForm'
  })
)(withRouter(FiscalForm));
