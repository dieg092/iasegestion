import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Card } from '../containers/common';
import { POPULATION } from '../../utils/population';

class Usuarios extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  onUserClick(user) {
    this.props.userClicked(user, this.props.history);
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
          <td>{population.value !== '123' ? population.label : '-'}</td>
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

  render() {
    return (
      <div className="admin-container">
        <div className="row admin-margin-container">
          <div className="col s12">
          <div>
            <h3>Usuarios</h3>
          </div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const users  = state.user.users;
  return { users };
}

export default connect(mapStateToProps, actions)(Usuarios);
