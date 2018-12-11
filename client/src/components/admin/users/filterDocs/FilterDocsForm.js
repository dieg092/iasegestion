import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/autocomplete';
import M from "materialize-css/dist/js/materialize.min.js";
import AuthField from './AuthField';
import formFields from './formFields';
import * as actions from '../../../../actions';

class FilterDocsForm extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type, icon, options }) => {
        return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField} />
    });
  }

  onSubmitFilerFiscal() {
    if (this.props.filterFiscalsForm.values.client) {
      this.props.filterFiscalsForm.values.client = this.props.userSelected._id;
    }

    this.props.fetchDocs(1, this.props.filterFiscalsForm.values);

    $("#target option:first").attr('selected','selected');
  }

  render() {
    return (
       <form onSubmit={this.props.handleSubmit(this.onSubmitFilerFiscal.bind(this))}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div className="col s12 margin-top-20 ">
                <div></div>
                  {this.renderFields()}
                </div>
              </div>
              <div className="card-action">
                <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15 margin-left-50 right col s12 m2 xl1">
                  Filtrar
                </button>
              </div>
            </div>
          </div>
        </form>
    );
  }
}

function mapStateToProps(state) {
  const docSelected = state.post.docSelected;
  const filterFiscalsForm = state.form.filterFiscalsForm;
  const userSelected = state.user.userSelected;

  return { docSelected, filterFiscalsForm, userSelected };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'filterFiscalsForm',
    value: ''
  })
)(withRouter(FilterDocsForm));
