import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilterDocsForm from './users/filterDocs/FilterDocsForm';
import * as actions from '../../actions';
import CONSTANTS from '../../utils/constants';

class AdminFiscal extends Component {
  componentDidMount() {
    if (this.props.userSelected) {

      this.props.fetchDocs(1, { client: this.props.userSelected._id });
    } else {
      this.props.fetchDocs(1, null);
    }

    this.props.docNotSelected();
  }

  onDocClick(doc) {
    this.props.docClicked(doc, this.props.history);
  }

  onPaginationClick(page) {
    this.props.fetchDocs(page, this.props.filterFiscalsForm.values)
  }

  renderDocs() {
    return this.props.docs.map(doc => {
      return (
        <tr id="table" key={doc._id}>
          <td onClick={() => {this.onDocClick(doc)}}>{doc.type}</td>
          <td onClick={() => {this.onDocClick(doc)}}>{doc.number ? doc.number : '-'}</td>
          <td onClick={() => {this.onDocClick(doc)}}>{doc.name}</td>
          <td onClick={() => {this.onDocClick(doc)}}>{doc.client[0].name + ' ' + doc.client[0].lastName}</td>
          <td onClick={() => {this.onDocClick(doc)}}>{new Date(doc.date).toLocaleDateString()}</td>
          <td className="centered"><a target="_blank" href={CONSTANTS.URL.photo + doc.pdf}><img src="/images/icono-pdf.png" alt="pdf" className="responsive-img" style={{ maxWidth: '30px' }} /></a></td>
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
        <div className="row">
          <div className="col s12 margin-top-20">
            <h4>Filtrar Documentos</h4>
            <div className="card">
              <FilterDocsForm />
            </div>
            <div className="col s12">
              <button onClick={() => {this.props.newDoc(this.props.history)}} className="col s12 m3 waves-effect white grey-text text-darken-4 btn-large right margin-top-20 no-padding-x">SUBIR OTRO DOCUMENTO</button>
              <button onClick={() => {this.props.newTax(this.props.history)}} href="/admin/fiscal-financiero/nuevo-impuesto" className="col s12 m3 margin-right-12 waves-effect white grey-text text-darken-4 btn-large right margin-top-20 no-padding-x margin-bottom-30">SUBIR IMPUESTO</button>
            </div>

            <h4 className="margin-top-20">Listado de Documentos</h4>
              <div className="card">
                <table className="highlight">
                  <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Modelo</th>
                        <th>Nombre</th>
                        <th>Cliente</th>
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
    );
  }
}

function mapStateToProps(state) {
  const docs  = state.doc.docs;
  const pages  = state.doc.pages;
  const page  = state.doc.page;
  const userSelected = state.user.userSelected;
  const filterFiscalsForm = state.form.filterFiscalsForm;

  return { docs, pages, page, filterFiscalsForm, userSelected };
}

export default connect(mapStateToProps, actions)(withRouter(AdminFiscal));
