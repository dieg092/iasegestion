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
import formFieldsClient from '../formFields';
import formFields from './formFields';
import * as actions from '../../../../actions';

class FilterFiscalForm extends Component {
  state = { user_id: null };

  componentDidMount() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  renderFields() {
    const pathname = this.props.location.pathname.split('/')[3];

    return _.map(this.props.location.pathname.split('/')[3] === 'impuestos' || this.props.location.pathname.split('/')[3] === 'financiero' ? formFieldsClient : formFields, ({ label, name, type, icon, options }) => {
      if ((this.props.location.pathname.split('/')[3] === 'impuestos' || this.props.location.pathname.split('/')[3] === 'financiero') && name !== 'client') {
        return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField} pathname={pathname} />
      } else if (this.props.location.pathname.split('/')[3] !== 'impuestos' && this.props.location.pathname.split('/')[3] !== 'financiero') {
        return <Field key={name} label={label} type={type} name={name} options={options} component={AuthField} pathname={pathname} />
      }
    });
  }

  onSubmitFilerFiscal() {
    if (this.state.user_id) {
      this.props.filterFiscalsForm.values.clientFilter = this.state.user_id;
        this.props.fetchDocs(1, this.props.filterFiscalsForm.values);
    } else if (this.props.location.pathname.split('/')[3] === 'impuestos') {
      if (this.props.filterFiscalsForm.values) {
        this.props.filterFiscalsForm.values.client = this.props.userLogged._id;
        this.props.filterFiscalsForm.values.type = 'Impuesto';

        this.props.fetchDocs(1, this.props.filterFiscalsForm.values)
      } else {

        this.props.fetchDocs(1, {client: this.props.userLogged._id, type: 'Impuesto'});
      }
    } else if (this.props.location.pathname.split('/')[3] === 'financiero') {
      if (this.props.filterFiscalsForm.values) {
        this.props.filterFiscalsForm.values.client = this.props.userLogged._id;
        if (!this.props.filterFiscalsForm.values.type) {
          this.props.filterFiscalsForm.values.type = 'Financiero';
        }
        this.props.fetchDocs(1, this.props.filterFiscalsForm.values)
      } else {
        this.props.fetchDocs(1, { client: this.props.userLogged._id, type: 'Financiero' })
      }
    } else {
      this.props.fetchDocs(1, this.props.filterFiscalsForm.values);
    }
      $("#target option:first").attr('selected','selected');
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

  render() {
    return (
       <form onSubmit={this.props.handleSubmit(this.onSubmitFilerFiscal.bind(this))}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div className="col s12 margin-top-20 ">
                <div></div>
                  {this.renderFields()}
                  {this.loadClients()}
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
  const userLogged = state.auth.userLogged;

  return { docSelected, filterFiscalsForm, userLogged };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'filterFiscalsForm',
    value: ''
  })
)(withRouter(FilterFiscalForm));
