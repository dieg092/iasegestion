import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { CardImageh1h2 } from '../containers/common';

class AdminServices extends Component {
  componentDidMount() {
    this.props.fetchServices(1);
  }

  onServiceClick(service) {
    this.props.serviceClicked(service, this.props.history);
  }

  renderServices() {
    return this.props.services.map(service => {
      return (
        <div key={service._id} className="col l4" onClick={() => {this.onServiceClick(service)}}>
            <CardImageh1h2
              image={'https://s3.eu-west-3.amazonaws.com/iase-test/' + service.mainPhoto}
              title={service.title}
              body={service.shortDescription}
            />
        </div>
      );
    });
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
              {this.props && this.props.services && this.renderServices()}
            </div>

          </div>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const services  = state.service.services;
  const pages  = state.service.pages;
  const page  = state.service.page;

  return { services, pages, page };
}

export default connect(mapStateToProps, actions)(AdminServices);
// {this.props.pages >= 12 &&
//   <div className="center" style={{ paddingBottom: '10px', paddingTop: '10px' }}>
//     <ul className="pagination">
//       <li className={this.props.page === 1 ? 'disabled' : 'waves-effect'} onClick={() => {this.onPaginationClick(this.props.page - 1)}}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
//       {this.pagination().map((result) => {
//         return (
//           <li key={result.key} className={result.props.className} onClick={() => {this.onPaginationClick(result.key)}}><a href="#!">{result.key}</a></li>
//         )
//       })}
//       <li className={this.props.page === this.props.pages ? 'disabled' : 'waves-effect'} onClick={() => {this.onPaginationClick(this.props.page + 1)}}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
//     </ul>
//   </div>
// }
//
//
//   onPaginationClick(page) {
//     this.props.fetchServices(page)
//   }
