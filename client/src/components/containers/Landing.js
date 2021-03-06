import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh1h2} from '../containers/common';
import Footer from './Footer';
import CONSTANTS from '../../utils/constants';

class Langing extends Component {
  componentDidMount() {
    this.props.favouriteServices();
    const height = $( window ).height() * 0.8;
    const elems = document.querySelectorAll('.slider');
    M.Slider.init(elems, {
      indicators: false,
      height: height
    });

    const elem = document.querySelectorAll('.modal');
    M.Modal.init(elem, {});
  }

  openRequestModal() {
    this.props.clientAccessModal();
  }

  renderServicesFavourite() {
    return this.props.servicesFavourite.map(service => {
      return (
          <div key={service._id} className="col xl4">
            <CardImageh1h2
              image={CONSTANTS.URL.photo + service.mainPhoto}
              title={service.title}
              body={service.shortDescription}
              link={service.body.length > 10  && '/servicios/' + service.slug}
            />
          </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="slider margin-bottom-75">
         <ul className="slides">
           <li>
             <img alt="asesoria" src={'/images/graph.jpg'} />

             <div className="caption center-align">
               <h1 className="font-title">ASESORÍA</h1>
               <h2 className="light grey-text font-title text-lighten-3 font-40-custom bold">EMPRESARIAL</h2>
             </div>
           </li>
           <li>
             <img alt="cliente" src={'/images/manos.jpg'} />
             <div className="caption right-align">
               <h1 className="font-title grey-text text-lighten-3">Cada cliente</h1>
               <h2 className="light grey-text text-lighten-3 font-title font-40-custom bold">es nuestro mejor  y único cliente.</h2>
             </div>
           </li>
          </ul>
        </div>

        <div className="container">
          <h1 className="center">Servicios destacados</h1>
          <div className="row">
            {this.props.servicesFavourite && this.renderServicesFavourite()}
            <div className="col s12">
              <div className="row">
                <a href="/servicios" className="waves-effect white grey-text text-darken-4 btn-large margin-right-12 right margin-bottom-75">Más servicios</a>
              </div>
            </div>
          </div>
        </div>

        <div className="margin-bottom-100 image-block img-1" role="img" alt="proximidad">
          <div className="landing-container">
            <div className="row center">
              <div className="col l6">
                <h1 className="white-text landing-text">Apostamos por la proximidad con nuestros clientes.</h1>
              </div>
              <div className="col s12">
                <div>
                  <a onClick={() => {this.openRequestModal()}} className="waves-effect white grey-text text-darken-4 btn-large center margin-top-custom-2">Solicitar acceso</a>
                </div>
              </div>
              <div className="col offset-l6 l6 margin-top-custom">
                <h2 className="white-text landing-text">Apostamos por las nuevas tecnologías.</h2>
              </div>
            </div>
          </div>
        </div>


        <div className="container margin-bottom-100">
          <h1 className="center margin-bottom-75 col s12">¿Qué opinan nuestros clientes?</h1>
          <div className="row">
            <div className="col xl4">
              <div className="col s12 xl4 center-on-small-only margin-top-28">
                <div className="image-container">
                  <img alt="" className="circle img-client" src="/images/thermolympic.jpg" />
                </div>
              </div>
              <div className="col s12 xl8">
                <h2 className="font-35-custom">Alvin Wang</h2>
                <p>Alvin is an Information Systems and Human Computer Interaction Major. He worked as a Software Engineer at Fidelity Investments this past summer.</p>
                <h3 className="bold center font-20-custom">Thermolympic</h3>
              </div>
            </div>
            <div className="col xl4">
              <div className="col s12 xl4 center-on-small-only margin-top-28">
                <div className="image-container">
                  <img alt="" className="circle img-client" src="/images/mhenta.jpg" />
                </div>
              </div>
              <div className="col s12 xl8">
                <h2 className="font-35-custom">Alvin Wang</h2>
                <p>Alvin is an Information Systems and Human Computer Interaction Major. He worked as a Software Engineer at Fidelity Investments this past summer.</p>
                <h3 className="bold center font-20-custom">Mhenta</h3>
              </div>
            </div>
            <div className="col xl4">
              <div className="col s12 xl4 center-on-small-only margin-top-28">
                <div className="image-container">
                  <img alt="" className="circle img-client" src="/images/duromit.jpg" />
                </div>
              </div>
              <div className="col s12 xl8">
                <h2 className="font-35-custom">Alvin Wang</h2>
                <p>Alvin is an Information Systems and Human Computer Interaction Major. He worked as a Software Engineer at Fidelity Investments this past summer.</p>
                <h3 className="bold center font-20-custom">Duromit</h3>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const servicesFavourite  = state.service.servicesFavourite;

  return { servicesFavourite };
}

export default connect(mapStateToProps, actions)(Langing);
