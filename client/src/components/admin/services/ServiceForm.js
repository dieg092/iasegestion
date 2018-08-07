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
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type, icon, options }) => {
      return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField} />
    });
  }

  onSubmitService() {
    const mainPhoto = document.getElementById("principalPhoto").value;
    const editor = document.getElementById("editor").value;

    this.props.submitService(this.props.serviceForm.values, this.state.file, mainPhoto, editor, this.props.history);
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
                           placeholder="Elegir imágen principal" />
                     </div>
                  </div>
                  <h6>Contenido</h6>
                  <EditorConvertToHTML />
                </div>
              </div>
              <div className="card-action">
                <Link to="/admin/servicios" className="btn red btn-red waves-effect waves-light white-text no-uppercase margin-top-15 left">
                  Cancelar
                </Link>

                <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15 margin-left-50 right">
                  Guardar
                </button>
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

  return { serviceForm };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'serviceForm'
  })
)(withRouter(ServiceForm));
