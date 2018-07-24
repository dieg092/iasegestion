import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { CardImageh2h3 } from '../containers/common';
import Footer from './Footer';

const height = $( window ).height() * 0.3;

class Post extends Component {

  render() {
    return (
      <div>
        <div className="margin-bottom-75 margin-top-42-negative" style={{ backgroundImage: 'url(/images/building.png)', backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: '100%', height: height }}>
          <h1 className="center padding-top-145 white-text">Post 1</h1>
        </div>
        <div className="container row justify">
          <div className="col s12 xl8 padding-right-30">

            <h6 className="margin-bottom-30">
              <span className="bold">
                DEPARTAMENTO ECONOMÍA
              </span>
            </h6>

            <h6 className="margin-bottom-30">
              Presta los servicios de asesoría en MATERIAS FISCAL Y CONTABLE
            </h6>

            <h6 className="margin-bottom-30">
              Dentro del ámbito Tributario, asesoramos y confeccionamos las declaraciones de todos los impuestos del Sistema Tributario español, tanto a nivel nacional como autonómico, provincial y local (IRPF, Patrimonio, Sociedades, IVA, Transmisiones Patrimoniales).
            </h6>

            <h6 className="margin-bottom-30">
              Disponemos de un departamento dedicado a la <span className="bold">Planificación Fiscal</span> tanto nacional como Internacional, en la que prestamos asesoramiento sobre los aspectos fiscales de las operaciones internas, intracomunitarias y fuera de la Comunidad. Le ofrecemos asistencia legal y representación en procedimientos tributarios de cualquier tipo.
            </h6>

            <h6 className="margin-bottom-30">
              En el ámbito contable, multitud de empresas Clientes nos confían la revisión periódica de sus Estados Contables y la planificación del cierre del ejercicio.
            </h6>
            <h6 className="margin-bottom-30">
              Gestionamos la contabilidad de su empresa y elaboramos los balances, Memorias y cuentas anuales.
            </h6>
            <h6 className="margin-bottom-30">
              SERVICIO PRESTADO POR CINCO PROFESIONALES  LICENCIADOS EN CIENCIAS ECONOMICAS y LICENCIADOS EN DERECHO y  EN ADMINISTRACION y DIRECCION DE EMPRESAS. ADICIONALMENTE CONTAMOS CON COLABORACIONES CON OTROS DESPACHOS EN LA MAS ABSOLUTA COORDINACION CON NOSOTROS.
            </h6>
            <h6 className="margin-bottom-30">
              En unión con despachos especializados, asociados a nuestra firma, con los que mantenemos convenios de colaboración, le prestamos servicios en materia de <span className="bold">AUDITORIA Económico y Financiera de su empresa.</span>
            </h6>
            <h6 className="margin-bottom-30">
              <span className="bold">
                1.- ASESORIA FISCAL.
              </span>
            </h6>
            <h6 className="margin-bottom-30">
            </h6>
            <h6 className="margin-bottom-30">
               Asesoría fiscal y Presentación de modelos fiscales.
            </h6>
            <h6 className="margin-bottom-30">
               Asistencia fiscal en inspecciones tributarias.
            </h6>
            <h6 className="margin-bottom-30">
               Planteamientos previos de fiscalidad. Planificación Fiscal.
            </h6>

            <div className="container">
              <img className="responsive-img margin-top-20 margin-bottom-30 center" src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52e5be19eaabb3a7ae64eeb57a56f7e&auto=format&fit=crop&w=1350&q=80" />
            </div>

            <h6 className="margin-bottom-30">
              <span className="bold">
                2.- MERCANTIL, ECONOMICA  y CONTABLE.
              </span>
            </h6>
            <h6 className="margin-bottom-30">
              A.- Confección de contabilidades. Tanto Interna como externamente a su empresa. Preparamos, si fuera necesario  a personas de su organización para poder confeccionar directamente la contabilidad o bien  colaborar en ella.
            </h6>
            <h6 className="margin-bottom-30">
              O si lo prefiere, también le ponemos nuestra estructura a su servicio (OUTSOURCING). Para que su estructura y su personal indirecto, no se sobredimensione. Para que rentabilice sus recursos con la máxima eficiencia. Para que controle sus costes. Personal especializado y perfectamente formado de nuestra empresa le realiza su contabilidad en sus propias instalaciones, dejándole todos los documentos contables perfectamente archivados.
            </h6>
            <h6 className="margin-bottom-30">
              B.- Análisis de balances y de la evolución de su empresa.
            </h6>
            <h6 className="margin-bottom-30">
              C.- Análisis de la información financiera y económica de su empresa.
            </h6>
            <h6 className="margin-bottom-30">
              D.- Corrección de desequilibrios.
            </h6>
            <h6 className="margin-bottom-30">
              E.- Confección de los libros oficiales
            </h6>
            <h6 className="margin-bottom-30">
              F.- Formulación de cuentas anuales.
            </h6>
            <h6 className="margin-bottom-30">
              <span className="bold">
                3.- AUDITORIA ECONOMICA Y FINANCIERA:
              </span>
            </h6>

            <h6 className="margin-bottom-30">
              En unión con despachos especializados, asociados a nuestra firma, con los que mantenemos convenios de colaboración, le prestamos servicios en materia de <span className="bold">AUDITORIA</span> de su empresa. Preparamos, con antelación, a su empresa para estos trámites, para que la auditoría se desarrolle con la mayor normalidad posible. Nos encargamos, junto con el despacho asociado, de las tareas necesarias para elaborar la auditoría contable, económica y financiera de su empresa.
            </h6>

          </div>
          <div className="col s12 xl3 center border-left">
            <h2 className="font-35-custom">Otros posts</h2>
            <CardImageh2h3
              image="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32536727&auto=format&fit=crop&w=1350&q=80"
              title="Post 2"
              body=""
              link="/blog/post-2"
            />
            <CardImageh2h3
              image="https://images.unsplash.com/photo-1504198912477-3018896a9525?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8a8d03d811c1f087466020c19d947a6d&auto=format&fit=crop&w=1950&q=80"
              title="Post 3"
              body=""
            />
            <CardImageh2h3
              image="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b207890c10d8df3f11b7a520ad57d177&auto=format&fit=crop&w=1350&q=80"
              title="Post 4"
              body=""
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, actions)(Post);
// <span className="bold">
//   Cada cliente es nuestro mejor  y único cliente.
// </span>
