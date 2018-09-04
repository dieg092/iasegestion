import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from '../../actions';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

class Philosophy extends Component {

  render() {
    return (
      <div>
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo image-header image-philosophy" role="img" alt="filosofía" style={{ height: height }}>

          <h1 className="center padding-top-145 white-text font-title">Filosofía</h1>
        </div>
        <div className="container row justify font-18-custom">
          <div className="col s12">
            <p className="margin-bottom-30">
              <span className="bold">
                Cada cliente es nuestro mejor  y único cliente.
              </span>
            </p>
            <p>
              La filosofía básica de nuestra firma es identificarnos con las necesidades de nuestros clientes y hacer nuestros sus problemas, intereses e inquietudes con el máximo esfuerzo y responsabilidad para    ayudar a lograr sus objetivos empresariales.
            </p>

            <p className="margin-bottom-25">
              Apostamos por Estar más cerca de nuestros clientes.
            </p>
            <div className="container">
              <img className="responsive-img margin-top-20 margin-bottom-30 center border-10" alt="" src={'/images/mano_cliente.jpg'} />
            </div>
            <p className="margin-bottom-25">
              <span className="bold">
                La cercanía a los clientes y a sus necesidades es la clave para ofrecer un asesoramiento integral completo. En definitiva PROXIMIDAD  es uno de nuestros sellos de identificación.
              </span>
            </p>
            <p className="margin-bottom-25">
              Nuestro despacho apuesta por el firme compromiso de colaboración con nuestros clientes en la planificación y organización de su empresa, así como en la solución de los problemas diarios de su gestión empresarial.
            </p>

            <div className="container">
              <img className="responsive-img margin-top-20 margin-bottom-30 center border-10" alt="" src={'/images/users_hand.jpg'} />
            </div>
            <p className="margin-bottom-25">
              <span className="bold">
                PARA ELLO: ESPECIALIZACION Y COLABORACION. COORDINACION Y VISION INTEGRAL
              </span>
            </p>
            <p>
              <span  className="bold">
                El mundo de la empresa
              </span>, y de la PYME, ha experimentado cambios muy profundos. Hay una tendencia general hacia una mayor <span className="bold">complejidad en todos los ámbitos</span>: Laboral, Mercantil, Contable, Fiscal, Tributario, etc.
            </p>
            <p className="margin-bottom-25">
              Con el objetivo de abarcar todo este complejo mundo de la empresa, IASE está integrado por profesionales con  diferentes perfiles contamos  expertos en los distintos ámbitos del asesoramiento empresarial
              <span className="bold"> Invertimos en talento y capital humano, para que el cliente se sienta acompañado.</span>
            </p>
            <div className="container">
              <img className="responsive-img margin-top-20 margin-bottom-30 center border-10" alt="" src={'/images/grua.jpg'} />
            </div>
            <p className="margin-bottom-25">
              Por todo ello  hemos desarrollado líneas de colaboración exclusiva con entidades de gestión de ámbito nacional, con el fin de lograr el control absoluto de los servicios administrativos que pudieran generarse en el núcleo de nuestra actividad.
            </p>
            <p className="margin-bottom-25">
              <span className="bold">En definitiva ofrecemos un </span> servicio multidisciplinar <span className="bold">orientado a prever cualquier problema que pueda presentarse en el tráfico jurídico y económico del cliente, ejerciendo las acciones legales oportunas en defensa de sus intereses caso de ser necesario.</span>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, actions)(Philosophy);
