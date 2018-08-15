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
import * as actions from '../../../actions';

import { EditorConvertToHTML } from '../../../utils/EditorConvertToHTML';

window.jQuery = $;

class ServiceForm extends Component {
  state = { file: null };

  componentDidMount() {
    if (this.props.serviceSelected) {
      this.handleInitialize();
    }
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  handleInitialize() {
    const initData = {
      "serviceTitle": this.props && this.props.serviceSelected && this.props.serviceSelected.title,
      "shortDescription": this.props && this.props.serviceSelected && this.props.serviceSelected.shortDescription,
      "important": this.props && this.props.serviceSelected && this.props.serviceSelected.important
    };

    this.props.initialize(initData);
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type, icon, options }) => {
      return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField} />
    });
  }

  onSubmitService() {
    const mainPhoto = document.getElementById("principalPhoto").value;
    const editor = document.getElementById("editor").value;
    let edit = false;

    if (this.props.serviceSelected) {
      edit = true;
    }

    if (edit) {
      this.props.submitService(this.props.serviceForm.values, this.state.file, mainPhoto, editor, this.props.history, edit, this.props.serviceSelected);
    } else {
      this.props.submitService(this.props.serviceForm.values, this.state.file, mainPhoto, editor, this.props.history, edit);
    }


  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  render() {
    return (
       <form onSubmit={this.props.handleSubmit(this.onSubmitService.bind(this))}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div className="col s12 margin-top-20">
                  {this.renderFields()}
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
                        <input id="principalPhoto" className="file-path validate" type="text"
                           placeholder="Elegir imágen principal"
                           value={this.state.file ? this.state.file.title : (this.props.serviceSelected && this.props.serviceSelected.mainPhoto ? this.props.serviceSelected.mainPhoto.split('/')[1] : '')}/>
                     </div>
                  </div>
                  <h6>Contenido</h6>
                  <EditorConvertToHTML
                    value={this.props.serviceSelected && this.props.serviceSelected.body ? this.props.serviceSelected.body : ''}
                  />
                </div>
              </div>
              <div className="card-action">
                <div className="col s12 l3 left">
                  <Link to="/admin/servicios" className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15">
                    Cancelar
                  </Link>
                </div>
                <div className="col s12 l3 left">
                  <button type="button" data-target="modal-delete-service" className="btn amber darken-1 waves-effect waves-light btn-flat white-text no-uppercase margin-top-15 modal-trigger">
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
  const serviceForm = state.form.serviceForm;
  const serviceSelected = state.service.serviceSelected;

  return { serviceForm, serviceSelected };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'serviceForm'
  })
)(withRouter(ServiceForm));
