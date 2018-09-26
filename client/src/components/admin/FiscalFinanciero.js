import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminFiscal from './AdminFiscal';
import { CardImageh1h2 } from '../containers/common';
import * as actions from '../../actions';

class FiscalFinanciero extends Component {
  componentDidMount() {
    this.props.cleanUserSelected();
  }

  renderBody() {
      if (this.props.userLogged.rol) {
        return (
          <AdminFiscal />
        );
      } else {
        return (
          <div>
            <div className="col s12 l4 offset-l1 container">
              <CardImageh1h2
                image={'/images/fiscal.jpg'}
                title={'Fiscal'}
                body={'Aquí encontrarás todos los modelos'}
                link={'/admin/fiscal-financiero/impuestos'}
              />
            </div>
            <div className="col s12 l4 offset-l1 container">
              <CardImageh1h2
                image={'/images/economico.jpg'}
                title={'Económico Financiero'}
                body={'Aquí encontrarás todos los documentos relacionados con Conabilidad e Informes'}
                link={'/admin/fiscal-financiero/financiero'}
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
