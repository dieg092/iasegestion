import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilterFiscalForm from './fiscal/filter/FilterFiscalForm';
import * as actions from '../../actions';
import { CardImageh1h2 } from '../containers/common';

class ListDocument extends Component {
  state = { type: null };
  
  componentDidMount() {
    let type = '';
    if (this.props.location.pathname.split('/')[3] === 'impuestos') {
      type = 'Impuesto'
      this.setState({ type: 'Impuesto' });
    } else if (this.props.location.pathname.split('/')[3] === 'financiero') {
      type = 'Financiero'
      this.setState({ type: 'Financiero' });
    }

    this.props.fetchDocs(1, {client: this.props.userLogged._id, type: type});
  }

  onDocClick(doc) {
    this.props.docClicked(doc, this.props.history);
  }

  onPaginationClick(page) {
    if (this.props.filterFiscalsForm.values) {
      this.props.filterFiscalsForm.values.client = this.props.userLogged._id;
      if (!this.props.filterFiscalsForm.values.type) {
        this.props.filterFiscalsForm.values.type = this.state.type;
      }

      this.props.fetchDocs(page, this.props.filterFiscalsForm.values)
    } else {
      this.props.fetchDocs(page, { client: this.props.userLogged._id, type: this.state.type })
    }
  }

  renderDocs() {
    return this.props.docs.map(doc => {
      return (
        <tr style={{ cursor: 'default' }} key={doc._id}>
          {this.props.location.pathname.split('/')[3] !== 'impuestos' && <td>{doc.type}</td>}
          {this.props.location.pathname.split('/')[3] !== 'financiero' && <td>{doc.number ? doc.number : '-'}</td>}
          <td>{doc.name}</td>
          <td>{new Date(doc.date).toLocaleDateString()}</td>
          <td className="centered"><a target="_blank" href={'https://s3.eu-west-3.amazonaws.com/iase-test/' + doc.pdf}><img src="/images/icono-pdf.png" className="responsive-img" style={{ maxWidth: '30px' }} /></a></td>
        </tr>
      );
    });
  }

  pagination() {
    let rows = [];
    for (var i = 1; i <= this.props.pages; i++) {
        rows.push(<li key={i} className={this.props.page === i ? 'active waves-effect' : 'waves-effect'}><a href="#!">{i}</a></li>);
    }
    return rows;
  }

  render() {

    return (
      <div className="admin-container">
        <div className="row admin-margin-container">
          <div className="col s12">
            <h4>Filtrar Documentos</h4>
            <div className="card">
              <FilterFiscalForm />
            </div>

            <h4 className="margin-top-20">Listado de Documentos</h4>
              <div className="card">
                <table className="highlight">
                  <thead>
                    <tr>
                      {this.props.location.pathname.split('/')[3] !== 'impuestos' && <th>Tipo</th>}
                      {this.props.location.pathname.split('/')[3] !== 'financiero' && <th>Modelo</th>}
                      <th>Nombre</th>
                      <th>Fecha</th>
                      <th className="center">PDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props && this.props.docs && this.renderDocs()}
                  </tbody>
                </table>

                {this.props.pages >= 2 &&
                  <div className="center padding-y-10">
                    <ul className="pagination">
                      <li className={this.props.page === 1 ? 'disabled' : 'waves-effect'} onClick={() => {this.props.page !== 1 && this.onPaginationClick(this.props.page - 1)}}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                      {this.pagination().map((result) => {
                        return (
                          <li key={result.key} className={result.props.className} onClick={() => {this.onPaginationClick(result.key)}}><a href="#!">{result.key}</a></li>
                        )
                      })}
                      <li className={this.props.page === this.props.pages ? 'disabled' : 'waves-effect'} onClick={() => {this.props.page !== this.props.pages && this.onPaginationClick(this.props.page + 1)}}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                    </ul>
                  </div>
                }
            </div>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const docs  = state.doc.docs;
  const pages  = state.doc.pages;
  const page  = state.doc.page;
  const filterFiscalsForm = state.form.filterFiscalsForm;
  const userLogged = state.auth.userLogged;

  return { docs, pages, page, filterFiscalsForm, userLogged };
}

export default connect(mapStateToProps, actions)(withRouter(ListDocument));
