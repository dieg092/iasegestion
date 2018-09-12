import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from '../../actions';
import ConditionsContent from './ConditionsContent';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

class Conditions extends Component {

  render() {
    return (
      <div>
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo image-header image-conditions" role="img" alt="politica" style={{ height: height }}>
          <h1 className="center padding-top-145 white-text font-title">Términos y Condiciones de Uso</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <ConditionsContent />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, actions)(Conditions);
