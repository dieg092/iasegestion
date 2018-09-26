import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class HeaderAdmin extends Component {
  componentDidMount() {
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem,
      {
        edge: "left",
        inDuration: 250
      }
    );
  }

  renderHeader() {
    return (
    <div className="sidebar-header header-cover header-image">
      <div className="center header-content">
          <div className="sidebar-image">
              <img className="responsive-img opacity-container" alt="logo" src={'/images/logo.png'} />
          </div>
          <p className="bold">{this.props && this.props.userLogged && this.props.userLogged.email && this.props.userLogged.email.length >= 18 ? (this.props.userLogged.email.substr(0, 21) + '...') : this.props.userLogged.email}</p>

      </div>
    </div>
    )
  }

  render() {
    const path = this.props.location.pathname;
    const rol = this.props.userLogged.rol;

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">

            </ul>
          </div>
        </nav>

        <ul id="mobile-demo" className="sidenav sidenav-fixed nav-width">
          {this.renderHeader()}
          <div className="nav-position">
          {rol &&
            <li>
              <a href="/admin/usuarios" className={rol && (path === '/admin/usuarios' || path === '/') && 'primary-text'}>
                <i
                  className={rol && (path === '/admin/usuarios' || path === '/') ? 'primary-text material-icons prefix' : 'material-icons prefix'}
                >supervisor_account
                </i>
                <span className={rol && (path === '/admin/usuarios' || path === '/') && 'bold'}>Usuarios</span>
              </a>
            </li>
          }

            <li>
              <a href="/admin/laboral" className={path === '/admin/laboral' || (!rol && path === '/') && 'primary-text'}>
              <i
                className={path === '/admin/laboral' || (!rol && path === '/') ? 'primary-text material-icons prefix' : 'material-icons prefix'}
              >card_travel
              </i>
              <span className={path === '/admin/laboral' || (!rol && path === '/') ? 'bold' : ''}>
                Laboral
              </span>
              </a>
            </li>
            <li>
              <a href="/admin/fiscal-financiero" className={path === '/admin/fiscal-financiero' && 'primary-text'}>
                <i className={path === '/admin/fiscal-financiero' ? 'primary-text material-icons prefix' : 'material-icons prefix'}>
                content_copy
                </i>
                <span className={path === '/admin/fiscal-financiero' && 'bold'}>
                  Fiscal | Financiero
                </span>
              </a>
            </li>
            {rol &&
              <li className="margin-top-30">
                <a href="/admin/servicios" className={rol && (path === '/admin/servicios') && 'primary-text'}>
                  <i
                    className={rol && (path === '/admin/servicios') ? 'primary-text material-icons prefix' : 'material-icons prefix'}
                  >view_list
                  </i>
                  <span className={path === '/admin/servicios' && 'bold'}>
                    Servicios
                  </span>
                </a>
              </li>
            }
            {rol &&
              <li>
                <a href="/admin/posts" className={rol && (path === '/admin/posts') && 'primary-text'}>
                  <i
                    className={rol && (path === '/admin/posts') ? 'primary-text material-icons prefix' : 'material-icons prefix'}
                  >filter_none
                  </i>
                  <span className={path === '/admin/posts' && 'bold'}>
                    Posts
                  </span>
                </a>
              </li>
            }
          </div>
            <li className="exit-option">
              <a href="/api/logout"><i className="material-icons prefix">power_settings_new</i>Cerrar Sesión</a>
            </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  const { userLogged } = auth;
  return { userLogged };
}

export default connect(mapStateToProps, actions)(withRouter(HeaderAdmin));
//https://images.vexels.com/media/users/3/148177/isolated/preview/ee0d01a2796059e8298032a7442810b9-abstract-square-background-by-vexels.png
//http://toanhoang.com/wp-content/uploads/2016/04/materialdesign.png
//https://s.tmimgcdn.com/blog/wp-content/uploads/2016/04/1-9-2.jpg?x20232
