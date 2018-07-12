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

  render() {
    console.log(this.props)
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
          <div className="sidebar-header header-cover" style={{ backgroundImage: 'url(https://s.tmimgcdn.com/blog/wp-content/uploads/2016/04/1-9-2.jpg?x20232)', paddingTop: '30px', paddingBottom: '3px' }}>
            <div className="container center">
              <div className="sidebar-image">
                  <img className="circle responsive-im" style={{ maxWidth: '180px' }} src="http://iasegestion.com/templates/siteground/images/summer/joomla_logo.png" />
              </div>
              <p className="bold">{this.props && this.props.userLogged && this.props.userLogged.email && this.props.userLogged.email.length >= 18 ? (this.props.userLogged.email.substr(0, 21) + '...') : this.props.userLogged.email}</p>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
          {this.props.userLogged.rol &&
            <li>
              <a href="/usuarios" className={this.props.userLogged.rol && (this.props.location.pathname === '/usuarios' || this.props.location.pathname === '/') && 'primary-text'}>
                <i
                  className={this.props.userLogged.rol && (this.props.location.pathname === '/usuarios' || this.props.location.pathname === '/') ? 'primary-text material-icons prefix' : 'material-icons prefix'}
                >supervisor_account
                </i>
                Usuarios
              </a>
            </li>
          }

            <li>
              <a href="/laboral"  className={this.props.location.pathname === '/laboral' || (!this.props.userLogged.rol && this.props.location.pathname === '/') && 'primary-text'}>
              <i
                className={this.props.location.pathname === '/laboral' || (!this.props.userLogged.rol && this.props.location.pathname === '/') ? 'primary-text material-icons prefix' : 'material-icons prefix'}
              >card_travel
              </i>
              Asesoría Laboral
              </a>
            </li>
            <li><a href="/fiscal" className={this.props.location.pathname === '/fiscal' && 'primary-text'}><i className={this.props.location.pathname === '/fiscal' ? 'primary-text material-icons prefix' : 'material-icons prefix'}>content_copy</i>Asesoría Fiscal</a></li>
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
