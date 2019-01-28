import React, { Component } from 'react';
import $ from 'jquery';
import Footer from './Footer';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const height = $( window ).height() * 0.3;

class DigitalFirm extends Component {
  state = { file: null, err: null };

  componentDidMount() {
    this.props.tokenExist(this.props.history);
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  onSubmitPdf() {
    const pdfFile = document.getElementById("pdfFile").value;
    const pdfFileArray = pdfFile.split('.');

    if (pdfFileArray[pdfFileArray.length - 1] === 'pdf') {
      this.props.submitPdf(this.state.file, pdfFile, this.props.history);
      this.setState({
        err: null
      });
    } else {
      this.setState({
        err: 'El fichero adjunto no es un PDF. Adjunte el PDF correspondiente con su firma digital.'
      })
    }
  }

  render() {
    return (
      <div className="margin-top-28">
        <div className="height-adjust margiin-bottom-200">
          <div className="margin-bottom-75 margin-top-42-negative min-height-photo image-header image-request" alt="verificar" style={{ height: height }}>
            <h1 className="center padding-top-145 white-text font-title">Firma Digital PDF</h1>
          </div>
          <div className="margin-top-28 margin-bottom-2">
            <div className="container">
              <div className="card darken-1 hoverable">
                  <div className="card-content">
                    <span className="card-title">Adjunte el PDF firmado digitamente.</span>
                    <p>
                      Nuestros administradores revisarán el PDF y activarán su cuenta lo antes posible. Recibirá un correo electrónico con las claves de acceso cuando esté todo listo.
                    </p>
                    <form onSubmit={this.props.handleSubmit(this.onSubmitPdf.bind(this))}>
                      <div className="row margin-top-30">
                        <div className="file-field input-field col s6 offset-s3">
                            <div className="btn yellow darken-2">
                               <span>Adjuntar</span>
                               <input
                                 onChange={this.onFileChange.bind(this)}
                                 type="file"
                                 accept="image/*"
                               />
                            </div>

                            <div className="file-path-wrapper">
                               <input id="pdfFile" className="file-path validate" type="text"
                                  placeholder="Adjuntar PDF firmado digitalmente"
                                  value={this.state.file ? this.state.file.title : ''}/>
                            </div>
                         </div>
                        </div>
                        {this.state.err &&
                          <p className="red-text">{this.state.err}</p>
                        }
                        <div className="card-action center">
                          <button type="submit" className="btn btn-large teal white-text no-uppercase margin-top-15">
                            Enviar solicitud
                          </button>
                        </div>
                     </form>
                  </div>
                </div>
             </div>
          </div>
        </div>
        <div style={{ heigth: '300px' }}></div>
        <div >
          <Footer />
        </div>
      </div>
    );
  }
};

function validate(values) {
  const errors = {};

  return errors;
}

function mapStateToProps(state) {
  const digitalForm = state.form.digitalForm;

  return { digitalForm };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'digitalForm'
  })
)(withRouter(DigitalFirm));
