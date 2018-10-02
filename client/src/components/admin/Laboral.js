import React, { Component } from 'react';
import { connect } from 'react-redux';

class Laboral extends Component {
  render() {
    return (
      <div className="admin-container">
        <div className="row admin-margin-container">
          <div className="col s12">
            <h2 className="center">Laboral</h2>
              <h6>Para gestionar tus ficheros de RRHH haz click <a href="https://www.rrhhonline.com.es/" target="_blank" rel="noopener noreferrer">aquí</a></h6>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {})(Laboral);
