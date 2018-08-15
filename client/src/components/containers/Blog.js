import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh1h2 } from '../containers/common';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

class Blog extends Component {
  componentDidMount() {
      this.props.fetchPosts(1, null);
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
    console.log(this.props.posts)
    return (
      <div>
        <div className="margin-top-42-negative min-height-photo" style={{ backgroundImage: 'url(/images/imageblog.png)', backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: '100%', height: height }}>
          <h1 className="center padding-top-145 white-text font-title">Nuestro Blog</h1>
        </div>
        <nav className="margin-bottom-75 transparent menu-blog">
         <div className="nav-wrapper container">
           <ul id="nav-mobile" className="left hide-on-med-and-down">
             <li><a className="black-text">Todos</a></li>
             <li><a className="black-text">Categoría 1</a></li>
             <li><a className="black-text">Categoría 2</a></li>
             <li><a className="black-text">Categoría 3</a></li>
             <li><a className="black-text">Categoría 4</a></li>
           </ul>
         </div>
       </nav>
        <div className="container">
          <div className="row">
            {this.props && this.props.posts && this.renderPosts()}
          </div>
          <ul className="pagination center">
             <li className="disabled"><a><i className="material-icons">chevron_left</i></a></li>
             <li className="active"><a>1</a></li>
             <li className="waves-effect"><a>2</a></li>
             <li className="waves-effect"><a>3</a></li>
             <li className="waves-effect"><a>4</a></li>
             <li className="waves-effect"><a>5</a></li>
             <li className="waves-effect"><a><i className="material-icons">chevron_right</i></a></li>
          </ul>
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

  return { posts, pages, page };
}

export default connect(mapStateToProps, actions)(Blog);
