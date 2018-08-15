import React, { Component } from 'react';
import { compose } from "redux";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import axios from 'axios';
import PostForm from './PostForm';
import * as actions from '../../../actions';

class AdminPost extends Component {
  render() {
    return (
        <div className="admin-container">
          <div className="row">
            <div className="col m8 offset-m2 s12 darken-1">
              <h2 className="header center">{this.props.location.pathname === '/admin/posts/nuevo' ? 'Nuevo ' : 'Editar '} Post</h2>
                <div>
                  <PostForm />
                </div>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps({user}) {
  const { userSelected } = user;
  return { userSelected };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'postForm',
  })
)(AdminPost);
