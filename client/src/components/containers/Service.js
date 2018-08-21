import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh2h3 } from '../containers/common';
import Footer from './Footer';

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
            image={'https://s3.eu-west-3.amazonaws.com/iase-test/' + service.mainPhoto}
            title={service.title}
            link={'/servicios/' + service.slug}
          />
        </div>
      )
    })
  }

  render() {

    return (
      <div>
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo" style={{ backgroundImage: 'url(/images/building.png)', backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: '100%', height: height }}>
          <h1 className="center padding-top-145 white-text font-title">{this.props.service && this.props.service[0].title}</h1>
        </div>
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
