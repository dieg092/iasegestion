//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { compose } from "redux";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import axios from 'axios';
import ModalDeletePost from './posts/ModalDeletePost';
import PostForm from './posts/PostForm';
import * as actions from '../../actions';

class Post extends Component {
  constructor(props) {
      super(props);

      this.state = {
        post: null
      }
  }

  componentDidMount(){
    const postSlug = this.props.history.location.pathname.split('/')[3];
    const res = axios.get('/api/post/' + postSlug)
      .then((response) => {
        this.props.postData(response);
        this.setState({
          post: response
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
        <div className="admin-container">
          <div className="row">
            <div className="col m8 offset-m2 s12 darken-1">
              <h2 className="header center">Edición de Post</h2>
              {this.state.post &&
                <div>
                  <PostForm />
                  <ModalDeletePost />
                </div>
              }
            </div>
          </div>
        </div>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({
    form: 'postForm',
  })
)(Post);
