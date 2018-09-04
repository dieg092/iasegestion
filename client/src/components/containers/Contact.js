import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import * as actions from '../../actions';
import Footer from './Footer';
import ContactForm from '../contact/ContactForm';

const height = $( window ).height() * 0.3;

const GoogleMaps = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 41.64159167, lng: -0.8948082 }}
    >

     <Marker position={{ lat: 41.64159167, lng: -0.8948082 }} />
    </GoogleMap>
));

class Contact extends Component {
  render() {
    return (
      <div>
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo image-header image-contact" role="img" alt="contacto" style={{ height: height }}>
          <h1 className="center padding-top-145 white-text font-title">Contacto</h1>
        </div>

        <div className="container">
          <div className="card margin-right-11" >
            <div className="row">
              <div className="col s12 m12 l12 xl4">

                <GoogleMaps
                  isMarkerShown
                  defaultZoom={8}
                  containerElement={
                      <div className="content-element" />
                  }
                  mapElement={
                      <div className="map-element" />
                  }
                />
              </div>
              <div className="col s12 m12 l12 xl8 padding-left-30 padding-right-30">
                <div className="margin-bottom-15" style={{ padding: '12px' }}>
                  <h2 className="bold margin-bottom-30 font-35-custom">Contata con nosotros</h2>
                  <p className="font-20-custom">Si desea realizar alguna consulta sobre nuestros productos o nuestra empresa, póngase en contacto con nosotros a través de:</p>
                </div>

                <div className="col s12 m12 l12 xl6">
                  <h2 className="bold margin-bottom-40 font-35-custom">Nuestros Contactos</h2>
                  <h3 className="valign-wrapper font-20-custom"><i className="material-icons margin-right-12">location_on</i> Plaza San Francisco 18 4ºD - 50006 Zaragoza</h3>
                  <h3 className="valign-wrapper font-20-custom"><i className="material-icons margin-right-12">mail_outline</i> informacion@iasegestion.com</h3>
                  <h3 className="valign-wrapper font-20-custom"><i className="material-icons margin-right-12">phone</i> 976 232 771</h3>
                  <h3 className="valign-wrapper font-20-custom"><i className="material-icons margin-right-12">phone</i> 976 238 481</h3>
                </div>
                <div className="col s12 m12 l12 xl6 margin-bottom-50">
                  <h2 className="bold margin-bottom-30 font-35-custom">¿Alguna pregunta?</h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, actions)(Contact);
