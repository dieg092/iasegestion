import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh1h2 } from '../containers/common';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

class Blog extends Component {

  render() {
    return (
      <div>
        <div className="margin-top-42-negative" style={{ backgroundImage: 'url(/images/imageblog.png)', backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: '100%', height: height }}>
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
            <div className="col l4">
              <CardImageh1h2
                image="https://images.unsplash.com/photo-1518021964703-4b2030f03085?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=67eedb090e43beecf456d519c3fca86c&auto=format&fit=crop&w=1353&q=80"
                title="Post 1"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
                link="/blog/post-1"
              />
            </div>
            <div className="col l4">
              <CardImageh1h2
                image="https://images.unsplash.com/photo-1504198912477-3018896a9525?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8a8d03d811c1f087466020c19d947a6d&auto=format&fit=crop&w=1950&q=80"
                title="Post 2"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
              />
            </div>
            <div className="col l4">
              <CardImageh1h2
                image="https://images.unsplash.com/photo-1522070436199-956aa4b7dec9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec391df493ec165dc1b9789512d16703&auto=format&fit=crop&w=1350&q=80"
                title="Post 3"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
              />
            </div>
            <div className="col l4">
              <CardImageh1h2
                image="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b207890c10d8df3f11b7a520ad57d177&auto=format&fit=crop&w=1350&q=80"
                title="Asesoría Financiera"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
              />
            </div>
            <div className="col l4">
              <CardImageh1h2
                image="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32536727&auto=format&fit=crop&w=1350&q=80"
                title="Post 4"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
              />
            </div>
            <div className="col l4">
              <CardImageh1h2
                image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52e5be19eaabb3a7ae64eeb57a56f7e&auto=format&fit=crop&w=1350&q=80"
                title="Post 5"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
              />
            </div>
            <div className="col l4"></div>
            <div className="col l4">
              <CardImageh1h2
                image="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32536727&auto=format&fit=crop&w=1350&q=80"
                title="Post 6"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
              />
            </div>

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

export default connect(null, actions)(Blog);
