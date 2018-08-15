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
import * as actions from '../../../../actions';
import { POPULATION } from '../../../../utils/population';

class FilterForm extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type, icon, options }) => {
      return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField} />
    });
  }

  onSubmitFilerUser() {
    this.props.fetchUsers(1, this.props.filterUserForm.values);
    $("#target option:first").attr('selected','selected');

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
    })
  }

  render() {
    return (
       <form onSubmit={this.props.handleSubmit(this.onSubmitFilerUser.bind(this))}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div className="col s12 margin-top-20 ">
                <div></div>
                  {this.renderFields()}
                </div>
                {this.loadPopulations()}
              </div>
              <div className="card-action">
                <button type="submit" className="btn teal btn-flat waves-effect waves-light white-text no-uppercase margin-top-15 margin-left-50 right col s12 m2 xl1">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </form>
    );
  }
}

function mapStateToProps(state) {
  const userSelected = state.user.userSelected;
  const filterUserForm = state.form.filterUserForm;

  return { userSelected, filterUserForm };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'filterUserForm',
    value: ''
  })
)(withRouter(FilterForm));
