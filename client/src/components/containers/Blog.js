import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh1h2Post } from '../containers/common';
import CONSTANTS from '../../utils/constants';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

class Blog extends Component {
  componentDidMount() {
      this.props.fetchPosts(1, null);
  }

  onPaginationClick(page, category) {
    const filter = {
      category:  category
    }
    this.props.fetchPosts(page, filter)
  }

  onCategoryClicked(category) {
    this.props.categoryClicked(category);
    const filter = {
      category:  category
    }

    this.props.fetchPosts(1, filter);
  }

  renderPosts() {
    return this.props.posts.map(post => {
      return (
        <div key={post._id} className="col xl4">
            <CardImageh1h2Post
              image={CONSTANTS.URL.photo + post.mainPhoto}
              title={post.title}
              link={'/blog/' + post.slug}
              alt={post.alt}
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
      <div>
        <div className="margin-top-42-negative min-height-photo image-header image-blog" role="img" alt="blog" style={{ height: height }}>
          <h1 className="center padding-top-145 white-text font-title">Nuestro Blog</h1>
        </div>
        <nav className="margin-bottom-75 transparent menu-blog">
         <div className="nav-wrapper container">
           <ul id="nav-mobile" className="left hide-on-med-and-down">
             <li onClick={() => {this.onCategoryClicked('')}}><a className={this.props.categoryCli === ''  ? 'white-text grey' : 'black-text'}>Todos</a></li>
             <li onClick={() => {this.onCategoryClicked('Actualidad')}}><a className={this.props.categoryCli === 'Actualidad' ? 'white-text grey' : 'black-text'}>Actualidad</a></li>
             <li onClick={() => {this.onCategoryClicked('Destacados')}}><a className={this.props.categoryCli === 'Destacados' ? 'white-text grey' : 'black-text'}>Destacados</a></li>
            </ul>
         </div>
       </nav>
        <div className="container">

          <div className="row">
            {this.props && this.props.posts &&
              (this.props.posts.length > 0 ?
                this.renderPosts()
              :
                <h4 className="container justify">
                  No hay artículos disponibles en este momento. Disculpe las molestias.
                </h4>
              )
            }

          </div>
            {this.props.pages >= 12 &&
              <div className="center padding-y-10">
                <ul className="pagination">
                  <li className={this.props.page === 1 ? 'disabled' : 'waves-effect'} onClick={() => {this.props.page !== 1 && this.onPaginationClick(this.props.page - 1, this.props.categoryCli)}}><a><i className="material-icons">chevron_left</i></a></li>
                  {this.pagination().map((result) => {
                    return (
                      <li key={result.key} className={result.props.className} onClick={() => {this.onPaginationClick(result.key, this.props.categoryCli)}}><a href="#!">{result.key}</a></li>
                    )
                  })}
                  <li className={this.props.page === this.props.pages ? 'disabled' : 'waves-effect'} onClick={() => {this.props.page !== this.props.pages && this.onPaginationClick(this.props.page + 1, this.props.categoryCli)}}><a><i className="material-icons">chevron_right</i></a></li>
                </ul>
              </div>
            }
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const posts  = state.post.posts;
  const pages  = state.post.pages;
  const page  = state.post.page;
  const filterPostsForm = state.post.filterPostsForm;
  const categoryCli = state.post.categoryClicked;

  return { posts, pages, page, filterPostsForm, categoryCli };
}

export default connect(mapStateToProps, actions)(Blog);
//<li onClick={() => this.onCategoryClicked('RR.HH')}><a className={this.props.categoryCli === 'RR.HH' ? 'white-text grey' : 'black-text'}>RR.HH</a></li>
//<li onClick={() => this.onCategoryClicked('Márketing')}><a className={this.props.categoryCli === 'Márketing' ? 'white-text grey' : 'black-text'}>Márketing</a></li>
//<li onClick={() => this.onCategoryClicked('Técnica')}><a className={this.props.categoryCli === 'Técnica' ? 'white-text grey' : 'black-text'}>Técnica</a></li>
