import React from 'react';

export default ({ input, value, label, type, options, meta: { error, touched } }) => {

  return (
    <div>
      {type === 'text' &&
         <div className="input-field">
          <input {...input} id={input.name} type={type} className={input.name !== 'population' ? 'validate' : 'autocomplete' } />
          <label htmlFor={input.name} className={input.value !== '' && 'active'}>{label}</label>
          <div className="red-text">
            {touched && error}
          </div>
        </div>
      }

      {type === 'checkbox' &&
        <div className="switch">
          <h6>{label}</h6>
          <label>
            {options[0]}
            <input {...input}  type="checkbox" />
            <span className="lever"></span>
            {options[1]}
          </label>
        </div>
      }
    </div>
  );
};
