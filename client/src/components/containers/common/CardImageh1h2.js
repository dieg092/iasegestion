import React from 'react';

const CardImageh1h2 = (props) => {
  return (
    <div className="margin-top-28">
      <a href={props.link}>
        <div className="card darken-1 hoverable pointer">
          <div className="card-image">
             <img className="responsive-img" src={props.image} />
           </div>
            <div className="card-content">
              <h2 className="margin-top-0"><span className="card-title bold black-text">{props.title}</span></h2>
              <p className="black-text">
                {props.body}
              </p>
            </div>
          </div>
        </a>
    </div>
  );
};


export { CardImageh1h2 };
