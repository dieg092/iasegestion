import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { CardImageh1h2 } from '../containers/common';
import CONSTANTS from '../../utils/constants';

class AdminServices extends Component {
  componentDidMount() {
    this.props.fetchServices(1);
  }

  onServiceClick(service) {
    this.props.serviceClicked(service, this.props.history);
  }

  renderServices() {
    return this.props.services.map(service => {
      return (
        <div key={service._id} className="col xl4" onClick={() => {this.onServiceClick(service)}}>
          <CardImageh1h2
            image={CONSTANTS.URL.photo + service.mainPhoto}
            title={service.title}
            body={service.shortDescription}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="admin-container">
        <div className="row admin-margin-container">
          <div className="col s12">
          <h2 className="center">Servicios</h2>
          <div className="container">
            <div className="row">
              <div className="col s12 m3 offset-m9">
                <a href="/admin/servicios/nuevo" className="waves-effect white grey-text text-darken-4 btn-large margin-right-12 right">CREAR SERVICIO</a>
              </div>
            </div>
          </div>
          <div className="container">

            <div className="row">
              {this.props && this.props.services && this.renderServices()}
            </div>

          </div>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const services  = state.service.services;
  const pages  = state.service.pages;
  const page  = state.service.page;

  return { services, pages, page };
}

export default connect(mapStateToProps, actions)(AdminServices);
