import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh1h2 } from '../containers/common';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

class Services extends Component {
  componentDidMount() {
    this.props.fetchServices(1);
  }

  renderServices() {
    return this.props.services.map(service => {
      return (
        <div key={service._id} className="col l4">
            <CardImageh1h2
              image={'https://s3.eu-west-3.amazonaws.com/iase-test/' + service.mainPhoto}
              title={service.title}
              body={service.shortDescription}
              link={service.body.length > 8 && '/servicios/' + service.slug}
              alt={service.alt}
            />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo image-header image-services" role="img" alt="servicios" style={{ height: height }}>
          <h1 className="center padding-top-145 white-text font-title">Servicios</h1>
        </div>
        <div className="container">
          <div className="row">
            {this.props && this.props.services &&
              (this.props.services.length > 0 ?
                this.renderServices()
              :
                <h4 className="container justify">
                  No hay servicios disponibles en este momento. Disculpe las molestias.
                </h4>
              )
            }
          </div>
        </div>
        <Footer />
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

export default connect(mapStateToProps, actions)(Services);
