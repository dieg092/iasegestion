import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh2h3 } from '../containers/common';
import Footer from './Footer';
import CONSTANTS from '../../utils/constants';

const height = $( window ).height() * 0.3;

class Service extends Component {
  componentDidMount() {
    this.props.getService(this.props.history);
    this.props.otherServices(this.props.history)
  }

  renderOtherServices() {
    return this.props.servicesOthers.map(service => {
      return (
        <div key={service._id}>
          <CardImageh2h3
            image={CONSTANTS.URL.photo + service.mainPhoto}
            title={service.title}
            link={'/servicios/' + service.slug}
            alt={service.alt}
          />
        </div>
      )
    })
  }

  renderPhoto() {
    return (
      <div className="margin-bottom-75 margin-top-42-negative min-height-photo image-header" role="img" alt={this.props.service[0].alt} style={{ backgroundImage: 'url(' + CONSTANTS.URL.photo + this.props.service[0].mainPhoto + ')', height: height }}>
        <h1 className="center padding-top-145 white-text font-title">{this.props.service[0].title}</h1>
      </div>
    )
  }

  addResponsive() {
    const imges = document.getElementsByTagName('img');

    for (let i = 0; i <= Object.keys(imges).length; i++) {
      if (imges[i] && imges[i].classList.length === 0) {
        imges[i].classList.add("responsive-img");
      }
    }
  }

  render() {

    return (
      <div>
      {this.props.service && this.renderPhoto()}
        <div className="container row justify">
          <div className="col s12 xl9 padding-right-30">

          {this.props.service &&
            <div dangerouslySetInnerHTML={{__html: this.props.service[0].body}}></div>
          }
          </div>
          <div className="col s12 xl3 center border-left">
            <h2 className="font-35-custom">Otros servicios</h2>
            {this.props.servicesOthers && this.renderOtherServices()}
          </div>
        </div>
        <Footer />
        {this.addResponsive()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const service = state.service.serviceSelected;
  const servicesOthers = state.service.servicesOthers;

  return { service, servicesOthers };
}

export default connect(mapStateToProps, actions)(withRouter(Service));
// <span className="bold">
//   Cada cliente es nuestro mejor  y único cliente.
// </span>
