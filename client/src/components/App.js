import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './containers/Landing';
import Services from './containers/Services';
import Service from './containers/Service';
import Blog from './containers/Blog';
import Post from './containers/Post';
import Philosophy from './containers/Philosophy';
import AboutUs from './containers/AboutUs';
import Contact from './containers/Contact';
import Verify from './containers/RequestSuccess';
import Resend from './containers/RequestResend';
import NotFound from './containers/NotFound';
import ChangePass from './auth/rememberPass/changePass/ChangePassForm';

import HeaderAdmin from './admin/HeaderAdmin';
import Usuarios from './admin/Usuarios';
import Usuario from './admin/User';
import AdminServices from './admin/AdminServices';
import NewService from './admin/services/AdminService';
import AdminService from './admin/Service';

const Laboral = () => <h3>Laboral</h3>;
const Fiscal = () => <h3>Fiscal</h3>;

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render () {
    return (
      <div className="app-container">
        {this.props.userLogged !== null &&
          <BrowserRouter>
            <div>
                {this.props && this.props.userLogged ?
                  <HeaderAdmin />
                :
                  <Header />
                }
              <Switch>
                <Route exact path="/" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <Landing />)))} />
                <Route exact path="/servicios" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <Services />)))} />
                <Route exact path="/filosofia" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <Philosophy />)))} />
                <Route exact path="/quienes-somos" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <AboutUs />)))} />
                <Route exact path="/contacto" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <Contact />)))} />
                <Route exact path="/servicios/:nameService" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <Service />)))} />
                <Route exact path="/blog" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <Blog />)))} />
                <Route exact path="/blog/:namePost" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <Post />)))} />

                <Route exact path="/solicitud/verificar" render={() => (this.props.userLogged ? ( <Redirect to="/admin/usuarios"/> ) : ( <Verify />))} />
                <Route exact path="/solicitud/reenviar" render={() => (this.props.userLogged ? ( <Redirect to="/admin/usuarios"/> ) : ( <Resend />))} />
                <Route exact path="/regenerar/:token" render={() => (this.props.userLogged ? ( <Redirect to="/admin/usuarios"/> ) : ( <ChangePass />))} />

                {this.props.userLogged && this.props.userLogged.rol &&
                    <Route exact path="/admin/usuarios"  component={Usuarios} />
                }
                {this.props.userLogged && this.props.userLogged.rol &&
                    <Route exact path="/admin/usuarios/:idUsuario" component={Usuario} />
                }
                {this.props.userLogged && this.props.userLogged.rol &&
                    <Route exact path="/admin/servicios" component={AdminServices} />
                }
                {this.props.userLogged && this.props.userLogged.rol &&
                    <Route exact path="/admin/servicios/nuevo" component={NewService} />
                }
                {this.props.userLogged && this.props.userLogged.rol &&
                    <Route exact path="/admin/servicios/:slugService" component={AdminService} />
                }
                {this.props.userLogged &&
                    <Route exact path="/admin/laboral" component={Laboral} />
                }
                {this.props.userLogged &&
                    <Route exact path="/admin/fiscal" component={Fiscal} />
                }
                {!this.props.userLogged &&
                    <Route exact component={NotFound} />
                }
              </Switch>
            </div>
          </BrowserRouter>
        }
      </div>
    );
  }
};

function mapStateToProps({ auth }) {
  const { userLogged } = auth;
  return { userLogged };
}

export default connect(mapStateToProps, actions)(App);
