import React from 'react';

const CardImage = (props) => {
  return (
    <div className="margin-top-28">
        <div className="card darken-1 hoverable pointer">
          <div className="card-image">
             <img className="responsive-img" src={props.image} />
           </div>
            <div className="card-content">
              <span className="card-title bold">{props.title}</span>
              <p>
                {props.body}
              </p>
            </div>
          </div>
    </div>
  );
};


export { CardImage };
