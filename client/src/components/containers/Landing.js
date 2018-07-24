import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh1h2} from '../containers/common';
import ModalRequest from '../auth/ModalRequest';
import Footer from './Footer';

class Langing extends Component {
  componentDidMount() {
    const height = $( window ).height() * 0.8;
    const elems = document.querySelectorAll('.slider');
    M.Slider.init(elems, {
      indicators: false,
      height: height
    });


    const elem = document.querySelectorAll('.modal');
    M.Modal.init(elem, {});

  }

  openRequestModal() {
    this.props.requestModal();
  }

  render() {
    return (
      <div>
        <div className="slider margin-bottom-75">
         <ul className="slides">
           <li>
             <img src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20(1%20of%201)-5.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=92b4ef70a4e06a7e7bf54e1bde61b624&auto=format&fit=crop&w=1350&q=80" />
             <div className="caption center-align">
               <h1>Título Texto UNO!</h1>
               <h2 className="light grey-text text-lighten-3 font-40-custom">Descripción Texto UNO!.</h2>
             </div>
           </li>
           <li>
             <img src="https://images.unsplash.com/photo-1518169640858-0d622b058e5c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5ffa10ff5bac3a77cb7de6e4e7164787&auto=format&fit=crop&w=1383&q=80" />
             <div className="caption right-align">
               <h1>Right Aligned Caption</h1>
               <h2 className="light grey-text text-lighten-3 font-40-custom">Here is our small slogan.</h2>
             </div>
           </li>
          </ul>
        </div>

        <div className="container">
          <h1 className="center">Servicios destacados</h1>
          <div className="row">
            <div className="col l4">
              <CardImageh1h2
                image="https://images.unsplash.com/photo-1518021964703-4b2030f03085?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=67eedb090e43beecf456d519c3fca86c&auto=format&fit=crop&w=1353&q=80"
                title="Asesoría Económica"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
                link="/servicios/asesoria-economica"
              />
            </div>
            <div className="col l4">
              <CardImageh1h2
                image="https://images.unsplash.com/photo-1504198912477-3018896a9525?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8a8d03d811c1f087466020c19d947a6d&auto=format&fit=crop&w=1950&q=80"
                title="Asesoría Laboral"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."

              />
            </div>
            <div className="col l4">
              <CardImageh1h2
                image="https://images.unsplash.com/photo-1522070436199-956aa4b7dec9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec391df493ec165dc1b9789512d16703&auto=format&fit=crop&w=1350&q=80"
                title="Asesoría Jurídica"
                body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
                
              />
            </div>
            <a href="/servicios" className="waves-effect white grey-text text-darken-4 btn-large margin-right-12 right margin-bottom-75">Más servicios</a>
          </div>
        </div>

        <div className="margin-bottom-100" style={{ backgroundImage: 'url(/images/building.png)', backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: '100%', height: '100%' }}>
          <div className="landing-container">
            <div className="row center">
              <div className="col l6">
                <h1 className="white-text landing-text">Buscamos estar más cerca de nuestros clientes.</h1>
              </div>
              <div className="col s12">
                <div>
                  <a onClick={() => {this.openRequestModal()}} className="waves-effect white grey-text text-darken-4 btn-large center margin-top-custom-2">Solicitar acceso</a>
                </div>
              </div>
              <div className="col offset-l6 l6 margin-top-custom">
                <h2 className="white-text landing-text">Apostamos por las nuevas tecnologías.</h2>
              </div>
            </div>
          </div>
        </div>


        <div className="container margin-bottom-100">
          <h1 className="center margin-bottom-75 col s12">¿Qué opinan nuesrtos clientes?</h1>
          <div className="row">
            <div className="col l4">
              <div className="col s12 xl4 center-on-small-only margin-top-28">
                <div className="image-container">
                  <img className="circle" style={{ width: '100px', height: '100px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsDFTrQnrPC5HWbQbNddHew_1yIK5b14taTQbHks0mC_E1jQWz" />
                </div>
              </div>
              <div className="col s12 xl8">
                <h2 className="font-35-custom">Alvin Wang</h2>
                <p>Alvin is an Information Systems and Human Computer Interaction Major. He worked as a Software Engineer at Fidelity Investments this past summer.</p>
                <h3 className="bold center font-20-custom">SpaceX</h3>
              </div>
            </div>
            <div className="col l4">
              <div className="col s12 xl4 center-on-small-only margin-top-28">
                <div className="image-container">
                  <img className="circle" style={{ width: '100px', height: '100px' }} src="https://pbs.twimg.com/profile_images/641661554820190208/0pekIUcN_400x400.jpg" />
                </div>
              </div>
              <div className="col s12 xl8">
                <h2 className="font-35-custom">Alvin Wang</h2>
                <p>Alvin is an Information Systems and Human Computer Interaction Major. He worked as a Software Engineer at Fidelity Investments this past summer.</p>
                <h3 className="bold center font-20-custom">Hollywood</h3>
              </div>
            </div>
            <div className="col l4">
              <div className="col s12 xl4 center-on-small-only margin-top-28">
                <div className="image-container">
                  <img className="circle" style={{ width: '100px', height: '100px' }} src="https://i.pinimg.com/originals/af/19/67/af1967490480cf4731b750ed11afa03e.png" />
                </div>
              </div>
              <div className="col s12 xl8">
                <h2 className="font-35-custom">Alvin Wang</h2>
                <p>Alvin is an Information Systems and Human Computer Interaction Major. He worked as a Software Engineer at Fidelity Investments this past summer.</p>
                <h3 className="bold center font-20-custom">Facebook</h3>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(null, actions)(Langing);
//https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed17683f2c514eed2ab020ff59b1e3b8&auto=format&fit=crop&w=1224&q=80

// <div className="col l4">
//   <CardImageh1h2
//     image="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b207890c10d8df3f11b7a520ad57d177&auto=format&fit=crop&w=1350&q=80"
//     title="Asesoría Financiera"
//     body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
//   />
// </div>
// <div className="col l4">
//   <CardImageh1h2
//     image="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32036727&auto=format&fit=crop&w=1350&q=80"
//     title="Asesoría RR.HH."
//     body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
//   />
// </div>
// <div className="col l4">
//   <CardImageh1h2
//     image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52e5be19eaabb3a7ae64eeb57a56f7e&auto=format&fit=crop&w=1350&q=80"
//     title="Asesoría Marketing"
//     body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
//   />
// </div>
// <div className="col l4"></div>
// <div className="col l4"></div>
// <div className="col l4">
//   <CardImageh1h2
//     image="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32036727&auto=format&fit=crop&w=1350&q=80"
//     title="Asesoría Técnica"
//     body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
//   />
// </div>
