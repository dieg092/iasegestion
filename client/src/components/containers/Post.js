import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh2h3 } from '../containers/common';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.history);
    this.props.otherPosts(this.props.history)
  }

  renderOtherPosts() {
    return this.props.postsOthers.map(post => {
      return (
        <div key={post._id}>
          <CardImageh2h3
            image={'https://s3.eu-west-3.amazonaws.com/iase-test/' + post.mainPhoto}
            title={post.title}
            body=""
            link={'/blog/' + post.slug}
            alt={post.alt}
          />
        </div>
      )
    })
  }

  renderPhoto() {
    return (
      <div className="margin-bottom-75 margin-top-42-negative min-height-photo" style={{ backgroundImage: 'url(https://s3.eu-west-3.amazonaws.com/iase-test/' + this.props.postSelected.mainPhoto + ')', backgroundRepeat: 'no-repeat', backgroundPositionY: '-265px', width: '100%', backgroundSize: '100%', height: height }}>
        <h1 className="center padding-top-145 white-text font-title">{this.props.postSelected.title}</h1>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.postSelected && this.renderPhoto()}
        <div className="container row justify">
          <div className="col s12 xl9 padding-right-30">

              {this.props.postSelected &&
                <div dangerouslySetInnerHTML={{__html: this.props.postSelected.body}}></div>
              }

          </div>
          <div className="col s12 xl3 center border-left">
            <h2 className="font-35-custom">Otros posts</h2>
            {this.props.postsOthers && this.renderOtherPosts()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const postSelected = state.post.postSelected;
  const postsOthers = state.post.postsOthers;

  return { postSelected, postsOthers };
}

export default connect(mapStateToProps, actions)(withRouter(Post));
// <span className="bold">
//   Cada cliente es nuestro mejor  y único cliente.
// </span>
