//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { compose } from "redux";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import axios from 'axios';
import ModalDeleteService from './services/ModalDeleteService';
import ServiceForm from './services/ServiceForm';
import * as actions from '../../actions';

class Service extends Component {
  constructor(props) {
      super(props);

      this.state = {
        service: null
      }
  }

  componentDidMount(){
    const serviceSlug = this.props.history.location.pathname.split('/')[3];
    const res = axios.get('/api/service/' + serviceSlug)
      .then((response) => {
        this.props.serviceData(response);
        this.setState({
          service: response
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
        <div className="admin-container">
          <div className="row">
            <div className="col m8 offset-m2 s12 darken-1">
              <h2 className="header center">Edición de Servicio</h2>
              {this.state.service &&
                <div>
                  <ServiceForm />
                  <ModalDeleteService />
                </div>
              }
            </div>
          </div>
        </div>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({
    form: 'serviceForm',
  })
)(Service);
