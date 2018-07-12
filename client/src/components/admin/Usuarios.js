import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterForm from './users/filter/FilterForm';
import * as actions from '../../actions';
import { Card } from '../containers/common';
import { POPULATION } from '../../utils/population';

class Usuarios extends Component {
  componentDidMount() {
    this.props.fetchUsers(1, null);
  }

  onUserClick(user) {
    this.props.userClicked(user, this.props.history);
  }

  onPaginationClick(page) {
    this.props.fetchUsers(page)
  }

  renderUsers() {
    return this.props.users.map(user => {
      const population = POPULATION.find((element) => {
        if (element.value === user._population) {
          return element.label;
        }
      });

      return (
        <tr key={user.email} onClick={() => {this.onUserClick(user)}}>
          <td>{user.email}</td>
          <td>{user.name}</td>
          <td>{user.lastName}</td>
          <td>{user.nif}</td>
          <td>{population && population.value !== '123' ? population.label : (population && population.label ? '-' : '-')}</td>
          <td>{user.isVerified ? 'Si' : 'No'}</td>
          <td>{user.isActive ?
                <span className="new badge green" data-badge-caption={'ACTIVADO'}></span>
                :
                <span className="new badge red" data-badge-caption={'DESACTIVADO'}></span>
              }
          </td>
          <td>{new Date(user.requestDate).toLocaleDateString()}</td>
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
          <h2 className="center">Usuarios</h2>
            <h4>Filtrar Usuarios</h4>
          <div className="card">
            <FilterForm />
          </div>
          <h4>Listado de Usuarios</h4>
          <div className="card">
            <table className="highlight">
              <thead>
                <tr>
                    <th>Correo</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>NIF/CIF</th>
                    <th>Población</th>
                    <th>Verificado</th>
                    <th>Activado</th>
                    <th>Fecha solicitud</th>
                </tr>
              </thead>
              <tbody>
                {this.props && this.props.users && this.renderUsers()}
              </tbody>
            </table>

            {this.props.pages >= 40 &&
              <div className="center" style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                <ul className="pagination">
                  <li className={this.props.page === 1 ? 'disabled' : 'waves-effect'} onClick={() => {this.onPaginationClick(this.props.page - 1)}}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                  {this.pagination().map((result) => {
                    return (
                      <li key={result.key} className={result.props.className} onClick={() => {this.onPaginationClick(result.key)}}><a href="#!">{result.key}</a></li>
                    )
                  })}
                  <li className={this.props.page === this.props.pages ? 'disabled' : 'waves-effect'} onClick={() => {this.onPaginationClick(this.props.page + 1)}}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
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
  const users  = state.user.users;
  const pages  = state.user.pages;
  const page  = state.user.page;

  return { users, pages, page };
}

export default connect(mapStateToProps, actions)(Usuarios);
