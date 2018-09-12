import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardImageh1h2 } from '../containers/common';
import * as actions from '../../actions';

class FiscalFinanciero extends Component {

  renderBody() {
      if (this.props.userLogged.rol) {
        return (
          <div className="col s12 m3 offset-m9 margin-bottom-20">
            <a href="/admin/fiscal-financiero/nuevo" className="waves-effect white grey-text text-darken-4 btn-large right margin-top-20 no-padding-x">SUBIR DOCUMENTO</a>
          </div>
        );
      } else {
        return (
          <div>
            <div className="col s12 l6 container">
              <CardImageh1h2
                image={'https://www.flexcontact.com.br/negociar/wp-content/uploads/2016/11/03.jpg'}
                title={'Fiscal'}
                body={'Aquí encontrarás todos los modelos'}
              />
            </div>
            <div className="col s12 l6 container">
              <CardImageh1h2
                image={'http://fundacioncarlosslim.org/wp-content/uploads/2018/07/academica-curso-gratuito-contabilidad-basica-2.jpg'}
                title={'Económico Financiero'}
                body={'Aquí encontrarás todos los documentos relacionados con Conabilidad e Informes'}
              />
            </div>
          </div>
        );
      }
  }

  render() {
    return (
      <div className="admin-container">
        <div className="row admin-margin-container">
          <div className="col s12">
            <h2 className="center">Fiscal | Económico Financiero</h2>
            {this.renderBody()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  const { userLogged } = auth;
  return { userLogged };
}

export default connect(mapStateToProps, actions)(FiscalFinanciero);
