import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh1h2} from '../containers/common';
import Footer from './Footer';

class Langing extends Component {
  componentDidMount() {
    this.props.favouriteServices();
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

  renderServicesFavourite() {
    return this.props.servicesFavourite.map(service => {
      console.log(service)
      return (
          <div key={service._id} className="col l4">
            <CardImageh1h2
              image={'https://s3.eu-west-3.amazonaws.com/iase-test/' + service.mainPhoto}
              title={service.title}
              body={service.shortDescription}
              link={'/servicios/' + service.slug}
            />
          </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="slider margin-bottom-75">
         <ul className="slides">
           <li>
             <img alt="" src="https://images.unsplash.com/1/work-station-straight-on-view.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0bab11002aaa5491c9238eb0c9b4b28d&auto=format&fit=crop&w=1050&q=80" />
             <div className="caption center-align" style={{ marginTop: '-15px' }}>
               <h1 className="font-title">Tus documentos online</h1>
               <h2 className="light grey-text font-title text-lighten-3 font-40-custom bold">donde y cuando quieras.</h2>
             </div>
           </li>
           <li>
             <img alt="" src="https://images.unsplash.com/photo-1518169640858-0d622b058e5c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5ffa10ff5bac3a77cb7de6e4e7164787&auto=format&fit=crop&w=1383&q=80" />
             <div className="caption right-align">
               <h1 className="font-title grey-text text-darken-4">Cada cliente</h1>
               <h2 className="light grey-text text-darken-4 font-title font-40-custom bold">es nuestro mejor  y único cliente.</h2>
             </div>
           </li>
          </ul>
        </div>

        <div className="container">
          <h1 className="center">Servicios destacados</h1>
          <div className="row">
            {this.props.servicesFavourite && this.renderServicesFavourite()}
            <div className="col s12">
              <div className="row">
                <a href="/servicios" className="waves-effect white grey-text text-darken-4 btn-large margin-right-12 right margin-bottom-75">Más servicios</a>
              </div>
            </div>
          </div>
        </div>

        <div className="margin-bottom-100" style={{ backgroundImage: 'url(/images/building.png)', backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: '100%', height: '100%' }}>
          <div className="landing-container">
            <div className="row center">
              <div className="col l6">
                <h1 className="white-text landing-text">Apostamos por la proximidad con nuestros clientes.</h1>
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
                  <img alt="" className="circle" style={{ width: '100px', height: '100px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsDFTrQnrPC5HWbQbNddHew_1yIK5b14taTQbHks0mC_E1jQWz" />
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
                  <img alt="" className="circle" style={{ width: '100px', height: '100px' }} src="https://pbs.twimg.com/profile_images/641661554820190208/0pekIUcN_400x400.jpg" />
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
                  <img alt="" className="circle" style={{ width: '100px', height: '100px' }} src="https://i.pinimg.com/originals/af/19/67/af1967490480cf4731b750ed11afa03e.png" />
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

function mapStateToProps(state) {
  const servicesFavourite  = state.service.servicesFavourite;

  return { servicesFavourite };
}

export default connect(mapStateToProps, actions)(Langing);
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
