import React from 'react';

const CardImage = (props) => {
  return (
    <div className="margin-top-28">
        <div className="card darken-1 hoverable pointer">
          <div className="card-image">
             <img className="responsive-img" alt={props.alt} src={props.image} />
           </div>
            <div className="card-content">
              <span className="card-title bold black-text">{props.title}</span>
              <p className="black-text">
                {props.body}
              </p>
            </div>
          </div>
    </div>
  );
};


export { CardImage };
