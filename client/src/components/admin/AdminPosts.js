import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { CardImageh1h2 } from '../containers/common';

class AdminPosts extends Component {
  componentDidMount() {
      this.props.fetchPosts(1, null);
  }

  onPostClick(post) {
    this.props.postClicked(post, this.props.history);
  }

  onPaginationClick(page) {
    this.props.fetchPosts(page)
  }

  renderPosts() {
    return this.props.posts.map(post => {
      return (
        <div key={post._id} className="col l4" onClick={() => {this.onPostClick(post)}}>
            <CardImageh1h2
              image={'https://s3.eu-west-3.amazonaws.com/iase-test/' + post.mainPhoto}
              title={post.title}
            />
        </div>
      );
    });
  }

  render() {
    console.log(this.props)
    return (
      <div className="admin-container">
        <div className="row admin-margin-container">
          <div className="col s12">
          <h2 className="center">Posts del Blog</h2>
          <div className="container">
            <div className="row">
              <div className="col s12 m3 offset-m9">
                <a href="/admin/posts/nuevo" className="waves-effect white grey-text text-darken-4 btn-large margin-right-12 right">CREAR POST</a>
              </div>
            </div>
          </div>
          <div className="container">

            <div className="row">
              {this.props && this.props.posts && this.renderPosts()}
            </div>
            {this.props.pages >= 40 &&
              <div className="center" style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                <ul className="pagination">
                  <li className={this.props.page === 1 ? 'disabled' : 'waves-effect'} onClick={() => {this.onPaginationClick(this.props.page - 1)}}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                  {this.pagination().map((result) => {
                    return (
                      <li key={result.key} className={result.props.className} onClick={() => {this.onPaginationClick(result.key)}}><a href="#!">{result.key}</a></li>
                    )
                  })}
                  <li className={this.props.page === this.props.pages ? 'disabled' : 'waves-effect'} onClick={() => {this.onPaginationClick(this.props.page + 1)}}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const posts  = state.post.posts;
  const pages  = state.post.pages;
  const page  = state.post.page;

  return { posts, pages, page };
}

export default connect(mapStateToProps, actions)(AdminPosts);
