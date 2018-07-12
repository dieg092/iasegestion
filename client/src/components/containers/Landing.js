import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImage } from '../containers/common';

class Langing extends Component {
  componentDidMount() {
    const height = $( window ).height() - 200;
    const elems = document.querySelectorAll('.slider');
    M.Slider.init(elems, {
      indicators: false,
      height: height
    });
  }

  render() {
    return (
      <div>
        <div className="slider margin-bottom-75" style={{ position: 'relative' }}>
         <ul className="slides">
           <li>
             <img src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20(1%20of%201)-5.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=92b4ef70a4e06a7e7bf54e1bde61b624&auto=format&fit=crop&w=1350&q=80" />
             <div className="caption center-align">
               <h3>Título Texto UNO!</h3>
               <h5 className="light grey-text text-lighten-3">Descripción Texto UNO!.</h5>
             </div>
           </li>
           <li>
             <img src="https://images.unsplash.com/photo-1520598608789-0fa45bd26d91?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a8265c5004f728fb0fd91f4d051d3dbb&auto=format&fit=crop&w=1350&q=80" />
             <div className="caption left-align">
               <h3>Left Aligned Caption</h3>
               <h5 className="light grey-text text-lighten-3">Here is our small slogan.</h5>
             </div>
           </li>
           <li>
             <img src="https://images.unsplash.com/photo-1518169640858-0d622b058e5c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5ffa10ff5bac3a77cb7de6e4e7164787&auto=format&fit=crop&w=1383&q=80" />
             <div className="caption right-align">
               <h3>Right Aligned Caption</h3>
               <h5 className="light grey-text text-lighten-3">Here is our small slogan.</h5>
             </div>
           </li>
           <li>
             <img src="https://images.unsplash.com/photo-1526455026374-a105e60a65a3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=70e749a80820e194cf84f25fb9375f4d&auto=format&fit=crop&w=1992&q=80" />
             <div className="caption center-align">
               <h3>This is our big Tagline!</h3>
               <h5 className="light grey-text text-lighten-3">Here is our small slogan.</h5>
             </div>
           </li>
         </ul>
       </div>

        <div className="container">
          <h2 className="center">Servicios destacados</h2>
          <div className="row">
            <div className="col l4">
              <CardImage
                image="https://images.unsplash.com/photo-1518021964703-4b2030f03085?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=67eedb090e43beecf456d519c3fca86c&auto=format&fit=crop&w=1353&q=80"
                title="Asesoría Económica"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
              />
            </div>
            <div className="col l4">
              <CardImage
                image="https://images.unsplash.com/photo-1504198912477-3018896a9525?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8a8d03d811c1f087466020c19d947a6d&auto=format&fit=crop&w=1950&q=80"
                title="Asesoría Laboral"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
              />
            </div>
            <div className="col l4">
              <CardImage
                image="https://images.unsplash.com/photo-1522070436199-956aa4b7dec9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec391df493ec165dc1b9789512d16703&auto=format&fit=crop&w=1350&q=80"
                title="Asesoría Jurídica"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
              />
            </div>
            <a className="waves-effect white grey-text text-darken-4 btn-large margin-right-12 right margin-bottom-75">Más servicios</a>
          </div>
        </div>

        <div className="margin-bottom-100" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b207890c10d8df3f11b7a520ad57d177&auto=format&fit=crop&w=1350&q=80)', backgroundRepeat: 'no-repeat', height: 600, width: '100%', backgroundSize: '100%' }}>
          <div className="landing-container">
            <div className="row center">
              <div className="col l6">
                <h1 className="white-text landing-text">Buscamos estar más cerca de nuestros clientes.</h1>
              </div>
              <div className="col s12">
                <div>
                  <a className="waves-effect white grey-text text-darken-4 btn-large center margin-top-custom-2">Solicitar acceso</a>
                </div>
              </div>
              <div className="col offset-l6 l6 margin-top-custom">
                <h1 className="white-text landing-text">Apostamos por las nuevas tecnologías.</h1>
              </div>
            </div>
          </div>
        </div>


        <div className="container margin-bottom-100">
          <h2 className="center margin-bottom-75 col s12">¿Qué opinan nuesrtos clientes?</h2>
          <div className="row">
            <div className="col l4">
              <div className="col s12 xl4 center-on-small-only margin-top-28">
                <div className="image-container">
                  <img className="circle" style={{ width: '100px', height: '100px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsDFTrQnrPC5HWbQbNddHew_1yIK5b14taTQbHks0mC_E1jQWz" />
                </div>
              </div>
              <div className="col s12 xl8">
                <h4>Alvin Wang</h4>
                <p>Alvin is an Information Systems and Human Computer Interaction Major. He worked as a Software Engineer at Fidelity Investments this past summer.</p>
                <h6 className="bold center">SpaceX</h6>
              </div>
            </div>
            <div className="col l4">
              <div className="col s12 xl4 center-on-small-only margin-top-28">
                <div className="image-container">
                  <img className="circle" style={{ width: '100px', height: '100px' }} src="https://pbs.twimg.com/profile_images/641661554820190208/0pekIUcN_400x400.jpg" />
                </div>
              </div>
              <div className="col s12 xl8">
                <h4>Alvin Wang</h4>
                <p>Alvin is an Information Systems and Human Computer Interaction Major. He worked as a Software Engineer at Fidelity Investments this past summer.</p>
                <h6 className="bold center">Hollywood</h6>
              </div>
            </div>
            <div className="col l4">
              <div className="col s12 xl4 center-on-small-only margin-top-28">
                <div className="image-container">
                  <img className="circle" style={{ width: '100px', height: '100px' }} src="https://pbs.twimg.com/profile_images/685770502531497984/jHRmKJpP_400x400.jpg" />
                </div>
              </div>
              <div className="col s12 xl8">
                <h4>Alvin Wang</h4>
                <p>Alvin is an Information Systems and Human Computer Interaction Major. He worked as a Software Engineer at Fidelity Investments this past summer.</p>
                <h6 className="bold center">Facebook</h6>
              </div>
            </div>
          </div>
        </div>



        <footer className="page-footer margin-top-125" id="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Footer Content</h5>
                <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default connect(null, actions)(Langing);
//https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed17683f2c514eed2ab025ff59b1e3b8&auto=format&fit=crop&w=1224&q=80

// <div className="col l4">
//   <CardImage
//     image="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b207890c10d8df3f11b7a520ad57d177&auto=format&fit=crop&w=1350&q=80"
//     title="Asesoría Financiera"
//     body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
//   />
// </div>
// <div className="col l4">
//   <CardImage
//     image="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32536727&auto=format&fit=crop&w=1350&q=80"
//     title="Asesoría RR.HH."
//     body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
//   />
// </div>
// <div className="col l4">
//   <CardImage
//     image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52e5be19eaabb3a7ae64eeb57a56f7e&auto=format&fit=crop&w=1350&q=80"
//     title="Asesoría Marketing"
//     body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
//   />
// </div>
// <div className="col l4"></div>
// <div className="col l4"></div>
// <div className="col l4">
//   <CardImage
//     image="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32536727&auto=format&fit=crop&w=1350&q=80"
//     title="Asesoría Técnica"
//     body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
//   />
// </div>
