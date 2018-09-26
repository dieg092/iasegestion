import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterPostsForm from './posts/filter/FilterPostsForm';
import * as actions from '../../actions';
import { CardImageh1h2Post } from '../containers/common';
import CONSTANTS from '../../utils/constants';

class AdminPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts(1, null);
  }

  onPostClick(post) {
    this.props.postClicked(post, this.props.history);
  }

  onPaginationClick(page) {
    this.props.fetchPosts(page, this.props.filterPostsForm)
  }

  renderPosts() {
    return this.props.posts.map(post => {
      return (
        <div key={post._id} className="col xl4" onClick={() => {this.onPostClick(post)}}>
            <CardImageh1h2Post
              image={CONSTANTS.URL.photo + post.mainPhoto}
              title={post.title}
            />
        </div>
      );
    });
  }

  pagination() {
    let rows = [];
    for (var i = 1; i <= this.props.pages; i++) {
        rows.push(<li key={i} className={this.props.page === i ? 'active waves-effect' : 'waves-effect'}><a href="#!">{i}</a></li>);
    }
    return rows;
  }

  render() {
    return (
      <div className="admin-container">
        <div className="row admin-margin-container">
          <div className="col s12">
            <h2 className="center">Posts</h2>
            <h4>Filtrar Posts</h4>
            <div className="card">
              <FilterPostsForm />
            </div>
            <div className="col s12 m3 offset-m9 margin-bottom-20">
              <a href="/admin/posts/nuevo" className="waves-effect white grey-text text-darken-4 btn-large right margin-top-20 no-padding-x">CREAR POST</a>
            </div>

            <h4 className="margin-top-20">Listado de Posts</h4>
            <div className="container">
              <div className="row">
                {this.props && this.props.posts && this.renderPosts()}
              </div>
              {this.props.pages >= 2 &&
                <div className="center padding-y-10">
                  <ul className="pagination">
                    <li className={this.props.page === 1 ? 'disabled' : 'waves-effect'} onClick={() => {this.props.page !== 1 && this.onPaginationClick(this.props.page - 1)}}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                    {this.pagination().map((result) => {
                      return (
                        <li key={result.key} className={result.props.className} onClick={() => {this.onPaginationClick(result.key)}}><a href="#!">{result.key}</a></li>
                      )
                    })}
                    <li className={this.props.page === this.props.pages ? 'disabled' : 'waves-effect'} onClick={() => {this.props.page !== this.props.pages && this.onPaginationClick(this.props.page + 1)}}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
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
  const filterPostsForm = state.form.filterPostsForm;

  return { posts, pages, page, filterPostsForm };
}

export default connect(mapStateToProps, actions)(AdminPosts);
