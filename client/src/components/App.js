import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Verify from './containers/RequestSuccess';
import Resend from './containers/RequestResend';
import ChangePass from './auth/rememberPass/changePass/ChangePassForm';

import HeaderAdmin from './admin/HeaderAdmin';
import Usuarios from './admin/Usuarios';
import Usuario from './admin/User';

const Landing = () => <h2>Landing</h2>;
const NoMatch = () => <h1>404</h1>;
const Laboral = () => <h3>Laboral</h3>;
const Fiscal = () => <h3>Fiscal</h3>;
const Regenerar = () => <h3>Regenerar</h3>;

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render () {
    console.log('hola')
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
                <Route exact path="/" render={() => (this.props.userLogged ? ( <Redirect to="/usuarios"/> ) : ( <Landing />))} />
                <Route exact path="/solicitud/verificar" render={() => (this.props.userLogged ? ( <Redirect to="/usuarios"/> ) : ( <Verify />))} />
                <Route exact path="/solicitud/reenviar" render={() => (this.props.userLogged ? ( <Redirect to="/usuarios"/> ) : ( <Resend />))} />
                <Route exact path="/regenerar/:token" render={() => (this.props.userLogged ? ( <Redirect to="/usuarios"/> ) : ( <ChangePass />))} />

                {this.props.userLogged &&
                    <Route exact path="/usuarios"  component={Usuarios} />
                }
                {this.props.userLogged &&
                    <Route exact path="/usuarios/:idUsuario" component={Usuario} />
                }
                {this.props.userLogged &&
                    <Route exact path="/laboral" component={Laboral} />
                }
                {this.props.userLogged &&
                    <Route exact path="/fiscal" component={Fiscal} />
                }
                {!this.props.userLogged &&
                    <Route exact component={NoMatch} />
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
