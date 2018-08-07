import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterForm from './users/filter/FilterForm';
import * as actions from '../../actions';
import { Card } from '../containers/common';
import { POPULATION } from '../../utils/population';
import { CardImageh1h2 } from '../containers/common';

class AdminServices extends Component {
  componentDidMount() {

  }


  render() {
    return (
      <div className="admin-container">
        <div className="row admin-margin-container">
          <div className="col s12">
          <h2 className="center">Servicios</h2>
          <div className="container">
            <div className="row">
              <div className="col s12 m3 offset-m9">
                <a href="/admin/servicios/nuevo" className="waves-effect white grey-text text-darken-4 btn-large margin-right-12 right">CREAR SERVICIO</a>
              </div>
            </div>
          </div>
          <div className="container">
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
                  title="Asesoría RR.HH."
                  body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
                />
              </div>
              <div className="col l4">
                <CardImageh1h2
                  image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52e5be19eaabb3a7ae64eeb57a56f7e&auto=format&fit=crop&w=1350&q=80"
                  title="Asesoría Marketing"
                  body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
                />
              </div>
              <div className="col l4"></div>
              <div className="col l4">
                <CardImageh1h2
                  image="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32536727&auto=format&fit=crop&w=1350&q=80"
                  title="Asesoría Técnica"
                  body="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const users  = state.user.users;
  const pages  = state.user.pages;
  const page  = state.user.page;

  return { users, pages, page };
}

export default connect(mapStateToProps, actions)(AdminServices);
