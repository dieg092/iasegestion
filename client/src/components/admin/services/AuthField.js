import React from 'react';

export default ({ input, value, label, type, options, meta: { error, touched } }) => {

  return (
    <div>
      {type !== 'file' && type !== 'checkbox' &&
         <div className="input-field">
          {type === 'textarea' ?
            <textarea {...input} id={input.name} type={type} className='materialize-textarea'></textarea>
          :
            <input {...input} id={input.name} type={type} />
          }

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
