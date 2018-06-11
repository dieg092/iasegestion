import React from 'react';

const Card = (props) => {
  return (
    <div className="margin-top-28">
      <div className="container">
        <div className="card darken-1 hoverable">
            <div className="card-content">
              <span className="card-title">{props.title}</span>
              <p>
                {props.body}
              </p>
            </div>
          </div>
       </div>
    </div>
  );
};


export { Card };
