import React from 'react';

const CardImageh1h2 = (props) => {
  return (
    <div className="margin-top-28">
      <a href={props.link}>
        <div className={props.link && 'pointer'}>
          <div className="card darken-1 hoverable">
            <div className="card-image">
               <img className="card-height responsive-img" alt={props.alt} src={props.image} />
             </div>
              <div className="card-content" style={{ overflow: 'hidden' }} id="cardText">
                <h2 className="margin-top-0"><span className="card-title bold black-text">{props.title}</span></h2>
                <p className="black-text justify">
                  {props.body && props.body}
                </p>
              </div>
            </div>
          </div>
        </a>
    </div>
  );
};


export { CardImageh1h2 };
