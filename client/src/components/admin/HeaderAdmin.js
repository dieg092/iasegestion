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
    <div className="sidebar-header header-cover" style={{ backgroundImage: 'url(/images/calculator_small.jpg)', backgroundSize: '100%', paddingTop: '20px', paddingBottom: '3px' }}>
      <div className="center" style={{ backgroundColor: 'white', opacity: '0.7', borderRadius: '10px', marginLeft: '18px', marginRight: '18px', paddingTop: '5px'}}>

          <div className="sidebar-image">
              <img className="responsive-img" alt="logo" style={{ maxWidth: '180px' }} src={'/images/logo.png'} />
          </div>
          <p className="bold">{this.props && this.props.userLogged && this.props.userLogged.email && this.props.userLogged.email.length >= 18 ? (this.props.userLogged.email.substr(0, 21) + '...') : this.props.userLogged.email}</p>

      </div>
    </div>
    )
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">

            </ul>
          </div>
        </nav>

        <ul id="mobile-demo" className="sidenav sidenav-fixed" style={{ width: '250px' }}>
          {this.renderHeader()}
          <div style={{ position: 'relative' }}>
          {this.props.userLogged.rol &&
            <li>
              <a href="/admin/usuarios" className={this.props.userLogged.rol && (this.props.location.pathname === '/admin/usuarios' || this.props.location.pathname === '/') && 'primary-text'}>
                <i
                  className={this.props.userLogged.rol && (this.props.location.pathname === '/admin/usuarios' || this.props.location.pathname === '/') ? 'primary-text material-icons prefix' : 'material-icons prefix'}
                >supervisor_account
                </i>
                <span className={this.props.userLogged.rol && (this.props.location.pathname === '/admin/usuarios' || this.props.location.pathname === '/') && 'bold'}>Usuarios</span>
              </a>
            </li>
          }

            <li>
              <a href="/admin/laboral" className={this.props.location.pathname === '/admin/laboral' || (!this.props.userLogged.rol && this.props.location.pathname === '/') && 'primary-text'}>
              <i
                className={this.props.location.pathname === '/admin/laboral' || (!this.props.userLogged.rol && this.props.location.pathname === '/') ? 'primary-text material-icons prefix' : 'material-icons prefix'}
              >card_travel
              </i>
              <span className={this.props.location.pathname === '/admin/laboral' && 'bold'}>
                Asesoría Laboral
              </span>
              </a>
            </li>
            <li>
              <a href="/admin/fiscal" className={this.props.location.pathname === '/admin/fiscal' && 'primary-text'}>
                <i className={this.props.location.pathname === '/admin/fiscal' ? 'primary-text material-icons prefix' : 'material-icons prefix'}>
                content_copy
                </i>
                <span className={this.props.location.pathname === '/admin/fiscal' && 'bold'}>
                  Asesoría Fiscal
                </span>
              </a>
            </li>
            {this.props.userLogged.rol &&
              <li className="margin-top-30">
                <a href="/admin/servicios" className={this.props.userLogged.rol && (this.props.location.pathname === '/admin/servicios') && 'primary-text'}>
                  <i
                    className={this.props.userLogged.rol && (this.props.location.pathname === '/admin/servicios') ? 'primary-text material-icons prefix' : 'material-icons prefix'}
                  >view_list
                  </i>
                  <span className={this.props.location.pathname === '/admin/servicios' && 'bold'}>
                    Servicios
                  </span>
                </a>
              </li>
            }
            {this.props.userLogged.rol &&
              <li>
                <a href="/admin/posts" className={this.props.userLogged.rol && (this.props.location.pathname === '/admin/posts') && 'primary-text'}>
                  <i
                    className={this.props.userLogged.rol && (this.props.location.pathname === '/admin/posts') ? 'primary-text material-icons prefix' : 'material-icons prefix'}
                  >filter_none
                  </i>
                  <span className={this.props.location.pathname === '/admin/posts' && 'bold'}>
                    Posts
                  </span>
                </a>
              </li>
            }
          </div>
            <li style={{ position: 'absolute', bottom: '0px', paddingBottom: '0px', width: '100%' }}>
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
