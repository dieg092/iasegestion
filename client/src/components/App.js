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
import Conditions from './containers/Conditions';

import HeaderAdmin from './admin/HeaderAdmin';
import Usuarios from './admin/Usuarios';
import Usuario from './admin/User';
import AdminServices from './admin/AdminServices';
import NewService from './admin/services/AdminService';
import AdminService from './admin/Service';
import AdminPosts from './admin/AdminPosts'
import NewPost from './admin/posts/AdminPost';
import AdminPost from './admin/Post';
import Laboral from './admin/Laboral';
import FiscalFinanciero from './admin/FiscalFinanciero';
import FiscalNuevo from './admin/fiscal/AdminFiscal';
import AdminFiscal from './admin/Doc';
import ListDocument from './admin/ListDocument';

class App extends Component {

  componentDidMount() {
    console.log(process.env.NODE_ENV)
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
                <Route exact path="/terminos" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <Conditions />)))} />
                <Route exact path="/solicitud/verificar" render={() => (this.props.userLogged ? ( <Redirect to="/admin/usuarios"/> ) : ( <Verify />))} />
                <Route exact path="/solicitud/reenviar" render={() => (this.props.userLogged ? ( <Redirect to="/admin/usuarios"/> ) : ( <Resend />))} />
                <Route exact path="/regenerar/:token" render={() => (this.props.userLogged ? ( <Redirect to="/admin/usuarios"/> ) : ( <ChangePass />))} />

                {this.props.userLogged && this.props.userLogged.rol &&
                    <Route exact path="/admin/usuarios" component={Usuarios} />
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
                {this.props.userLogged && this.props.userLogged.rol &&
                    <Route exact path="/admin/posts" component={AdminPosts} />
                }
                {this.props.userLogged && this.props.userLogged.rol &&
                    <Route exact path="/admin/posts/nuevo" component={NewPost} />
                }
                {this.props.userLogged && !this.props.userLogged.rol &&
                    <Route exact path="/admin/fiscal-financiero/impuestos" component={ListDocument} />
                }
                {this.props.userLogged && !this.props.userLogged.rol &&
                    <Route exact path="/admin/fiscal-financiero/financiero" component={ListDocument} />
                }
                {this.props.userLogged && this.props.userLogged.rol &&
                    <Route exact path="/admin/posts/:slugPost" component={AdminPost} />
                }

                {this.props.userLogged &&
                    <Route exact path="/admin/laboral" component={Laboral} />
                }
                {this.props.userLogged &&
                    <Route exact path="/admin/fiscal-financiero" component={FiscalFinanciero} />
                }
                {this.props.userLogged &&
                    <Route exact path="/admin/fiscal-financiero/nuevo" component={FiscalNuevo} />
                }
                {this.props.userLogged &&
                    <Route exact path="/admin/fiscal-financiero/nuevo-impuesto" component={FiscalNuevo} />
                }
                {this.props.userLogged && this.props.userLogged.rol &&
                    <Route exact path="/admin/fiscal-financiero/:slugFiscal" component={AdminFiscal} />
                }
                {this.props.userLogged && !this.props.userLogged.rol &&
                    <Route exact render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/admin/laboral"/> ) : ( <Laboral />)))} />
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
