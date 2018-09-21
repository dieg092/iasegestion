import React from 'react';

const CardImageh2h3 = (props) => {
  return (
    <div className="margin-top-28">
      <a href={props.link}>
        <div className="card darken-1 hoverable pointer">
          <div className="card-image">
             <img className="responsive-img" alt={props.alt} src={props.image} />
           </div>
            <div className="card-content" style={{ overFlow: 'hidden' }} >
              <h3 className="margin-top-0"><span className="card-title bold black-text">{props.title}</span></h3>
              <p className="black-text">
                {props.body}
              </p>
            </div>
          </div>
        </a>
    </div>
  );
};


export { CardImageh2h3 };
