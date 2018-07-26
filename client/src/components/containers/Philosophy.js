import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh2h3 } from '../containers/common';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

class Philosophy extends Component {

  render() {
    return (
      <div>
        <div className="margin-bottom-75 margin-top-42-negative min-height-photo" style={{ backgroundImage: 'url(/images/building.png)', backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: '100%', height: height }}>
          <h1 className="center padding-top-145 white-text font-title">Filosofía</h1>
        </div>
        <div className="container row justify font-18-custom">
          <div className="col s12 xl8 padding-right-30">
            <p className="margin-bottom-30">
              <span className="bold">
                Cada cliente es nuestro mejor  y único cliente.
              </span> La filosofía básica de nuestra firma es identificarnos con las necesidades de nuestros clientes y hacer nuestros sus problemas, con el máximo esfuerzo e interés por ayudar a lograr sus objetivos empresariales.
            </p>
            <p className="margin-bottom-25">
              Apostamos por Estar más cerca de nuestros clientes.
            </p>
            <p className="margin-bottom-25">
              <span className="bold">
                La cercanía a los clientes y a sus necesidades es la clave para ofrecer un asesoramiento integral completo. En definitiva PROXIMIDAD a los clientes.
              </span>
            </p>
            <p className="margin-bottom-25">
              Nuestro despacho apuesta por el firme compromiso de colaboración con nuestros clientes en la <span className="bold">planificación y organización de su empresa</span>, así como en la <span className="bold">solución de los problemas diarios</span> de su gestión empresarial.
            </p>
            <p className="margin-bottom-25">
              <span className="bold">
                PARA ELLO: ESPECIALIZACION Y COLABORACION. COORDINACION Y VISION INTEGRAL
              </span>
            </p>
            <div className="container">
              <img className="responsive-img margin-top-20 margin-bottom-30 center" src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52e5be19eaabb3a7ae64eeb57a56f7e&auto=format&fit=crop&w=1350&q=80" />
            </div>
            <p>
              <span  className="bold">
                El mundo de la empresa
              </span>, y de la PYME, ha experimentado cambios muy profundos. Hay una tendencia general hacia una mayor <span className="bold">complejidad en todos los ámbitos</span>: Laboral, Mercantil, Contable, Fiscal, etcétera.
            </p>
            <p className="margin-bottom-25">
              Con el objetivo de abarcar todo este complejo mundo de la empresa, porque nos lo impone la realidad que vivimos, nos hemos asociado de lo contario nos alejaríamos de nuestros clientes.
            </p>
            <p className="margin-bottom-25">
              <span className="bold">Invertimos en talento y capital humano, para que el cliente se sienta acompañado.</span>
            </p>
            <p className="margin-bottom-25">
              Hemos desarrollado líneas de colaboración exclusiva con entidades de gestión de ámbito nacional, con el fin de lograr el control absoluto de los servicios administrativos que pudieran generarse en el núcleo de nuestra actividad.
            </p>
            <p className="margin-bottom-25">
              Nuestra originaria oficina de <span className="bold">Zaragoza</span> ha dado paso a una red internacional formada por otras cuatro oficinas sitas en <span className="bold">Madrid, Huesca, Buenos Aires (Argentina) y Lausana (Suiza)</span>, estando previstas nuevas expansiones y cerrados acuerdos de colaboración en otras ciudades españolas, europeas y americanas.
            </p>
            <p className="margin-bottom-25">
              Ello permite ofrecer a nuestros clientes un servicio no sólo rápido y eficaz, sino también próximo, haciendo gala a nuestro lema: <span className="bold">Cada cliente es nuestro mejor y único cliente. En definitiva PROXIMIDAD a los clientes. Mediante la colaboración  para estar más cerca.</span>
            </p>
            <div className="container">
              <img className="responsive-img margin-top-20 margin-bottom-30 center" src="https://images.unsplash.com/photo-1522070436199-956aa4b7dec9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec391df493ec165dc1b9789512d16703&auto=format&fit=crop&w=1350&q=80" />
            </div>

            <p className="margin-bottom-25">
              Nuestros profesionales están altamente cualificados y organizados en Departamentos especializados con el fin de prestar un servicio de máxima calidad. Disponemos de un equipo de profesionales de primer orden que, con los medios técnicos más modernos, le proporcionará las soluciones a las necesidades de gestión de cualquier particular o sociedad. Nuestros profesionales se actualizan constantemente de la últimas novedades legislativas, ofimáticas y administrativas, optimizando las soluciones para nuestros clientes.
            </p>
            <p className="margin-bottom-25">
              Debemos, y así lo hacemos, ser capaces de asesorar en nuevas especialidades, tales como: Nuevas Tecnologías, Propiedad Intelectual, Protección de Datos, Patentes y Marcas, Competencia Desleal, Mercado Comunitario, y Exportaciones e Importaciones, entre otras.
            </p>
            <p className="margin-bottom-25">
              Por todo ello, hemos ampliado a través de asociaciones, buscando los especialistas en cada materia, con nuestro Plan de <span className="bold">Aumento del Capital Humano con el objetivo claro de estar cada día más cerca del cliente. Para que usted se sienta seguro.</span>
            </p>
            <p className="margin-bottom-25">
              Este capital humano está perfectamente coordinado para que no se pierda la visión integral del cliente. No se puede asesorar sólo en un tema, porque todos los aspectos están interrelacionados.
            </p>
            <p className="margin-bottom-25">
            Apostamos por las nuevas tecnologías, aplicadas en nuestra labor diaria para ofrecer un apoyo técnico conforme con sus necesidades, sin por ello, dejar de tener un trato personalizado. <span className="bold">GRANDES PERO AGILES</span>. Nos destacamos por ser una empresa dinámica e innovadora donde el principal interés radica en la atención al cliente. Hoy las nuevas tecnologías nos posibilitan esta visión integral, y no escatimamos esfuerzo ni inversión para PRESTAR LOS MEJORES SERVICIOS. Ponemos a su servicio los medios informáticos más modernos y competitivos. Conexión directa con <span  className="bold">Internet (INTRANET- EXTRANET)</span> y posibilidad de enviar o recibir información acortando sustancialmente el tiempo y el coste de las comunicaciones.
            </p>
            <p className="margin-bottom-25">
              <span className="bold">En definitiva, BUSCAMOS estar más cerca.</span>
            </p>
            <p className="margin-bottom-25">
              <span className="bold">Ofrecemos un</span> servicio multidisciplinar <span className="bold">orientado a prever cualquier problema que pueda presentarse en el tráfico jurídico y económico del cliente, ejerciendo las acciones legales oportunas en defensa de sus intereses caso de ser necesario.</span>
            </p>
          </div>
          <div className="col s12 xl3 center border-left">
            <h2 className="font-35-custom">Últimos Posts</h2>
            <CardImageh2h3
              image="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32536727&auto=format&fit=crop&w=1350&q=80"
              title="Asesoría Económica en las ciudades del sur"
              body=""
              link="/blog/post-1"
            />
            <CardImageh2h3
              image="https://images.unsplash.com/photo-1504198912477-3018896a9525?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8a8d03d811c1f087466020c19d947a6d&auto=format&fit=crop&w=1950&q=80"
              title="Asesoría Fiscal en las ciudades mas pobladas en España"
              body=""
            />
            <CardImageh2h3
              image="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b207890c10d8df3f11b7a520ad57d177&auto=format&fit=crop&w=1350&q=80"
              title="Asesoría Económica"
              body=""
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, actions)(Philosophy);
