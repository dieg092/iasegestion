import React, { Component } from 'react';
import { compose } from "redux";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ModalDeleteFiscal from './fiscal/ModalDeleteFiscal';
import FiscalForm from './fiscal/FiscalForm';
import * as actions from '../../actions';

class Doc extends Component {
  constructor(props) {
      super(props);

      this.state = {
        doc: null
      }
  }

  componentDidMount(){
    const docSlug = this.props.history.location.pathname.split('/')[3];
    axios.get('/api/docs/' + docSlug)
      .then((response) => {
        if (response.data[0]) {
          this.props.docData(response);
          this.setState({
            doc: response
          });
        } else {
          window.history.go(-1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderTypeDoc() {
    if (this.props.docSelected && this.props.docSelected.type !== 'Impuesto') {
      return(
          <h2 className="header center">Edición de Documento</h2>
      )
    } else {
      if (this.props.docSelected || this.props.history.location.pathname.split('/')[3] === 'nuevo-impuesto') {
        return(
          <h2 className="header center">Edición de Impuesto</h2>
        )
      } else {
        return(
          <h2 className="header center">Edición de Documento</h2>
        )
      }
    }
  }

  render() {
    return (
        <div className="admin-container">
          <div className="row">
            <div className="col m8 offset-m2 s12 darken-1">
              {this.renderTypeDoc()}

              {this.state.doc &&
                <div>
                  <FiscalForm />
                  <ModalDeleteFiscal />
                </div>
              }
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const userSelected  = state.user.userSelected;
  const docSelected = state.doc.docSelected;
  return { userSelected, docSelected };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'docForm',
  })
)(Doc);
