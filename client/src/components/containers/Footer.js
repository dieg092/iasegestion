import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class Footer extends Component {
  componentDidMount() {
    this.props.otherPosts(this.props.history)
  }

  renderOtherPosts() {
    return this.props.postsOthers.map(post => {
      return (
        <li key={post._id} className="valign-wrapper grey-text text-lighten-3 margin-bottom-15">{post.title}</li>
      )
    })
  }

  render() {
    return (
      <footer className="page-footer margin-top-125" id="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l4 s12">
              <h5 className="white-text margin-bottom-30">IASE Gestión</h5>
              <p className="grey-text text-lighten-4">IASE GESTION se define como un DESPACHO PROFESIONAL  MULTIDISCIPLINAR de asesoría, consultaría, y gestión empresarial.</p>
            </div>
            <div className="col l4 offset-l1 s12">
              <h5 className="white-text margin-bottom-30">Contáctanos</h5>
              <ul>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15"><i className="material-icons margin-right-12">location_on</i> Plaza San Francisco 18 4ºD - 50006 Zaragoza</li>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15"><i className="material-icons margin-right-12">mail_outline</i> informacion@iasegestion.com</li>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15"><i className="material-icons margin-right-12">phone</i> 976 232 771</li>
                <li className="valign-wrapper grey-text text-lighten-3 margin-bottom-15"><i className="material-icons margin-right-12">phone</i> 976 238 481</li>
              </ul>
            </div>
            <div className="col l3 s12">
              <h5 className="white-text margin-bottom-30">Últimos Posts</h5>
              <ul>
                {this.props.postsOthers && this.renderOtherPosts()}

              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <div className="row">
              <div className="col s12 l6">© 2018 Copyright IASE gestión. Todos los derechos reservados </div>

              <div className="col s12 l6">
                <a className="grey-text text-lighten-4 right margin-left-15" href="/contacto">Contacto</a>
                <a className="grey-text text-lighten-4 right margin-left-15" href="/terminos">Términos y Privacidad</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  const postsOthers = state.post.postsOthers;

  return { postsOthers };
}

export default connect(mapStateToProps, actions)(withRouter(Footer));
