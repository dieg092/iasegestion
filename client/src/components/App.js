import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Verify from './containers/RequestSuccess';
import Resend from './containers/RequestResend';

const Landing = () => <h2>Landing</h2>;
const NoMatch = () => <h4>404</h4>

class App extends Component {
  componentDidMount() {

  }

  render () {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/solicitud/verificar" component={Verify} />
              <Route exact path="/solicitud/reenviar" component={Resend} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);
