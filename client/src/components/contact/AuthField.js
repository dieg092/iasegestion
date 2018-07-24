// label and text input
import React from 'react';

export default ({ input, label, type, meta: { error, touched } }) => {

  return (
    <div>

    {type !== 'textarea' &&
       <div className="input-field">
        <input {...input} id={input.name} type={type} className={input.name !== 'population' ? 'validate' : 'autocomplete' } />
        <label htmlFor={input.name} className={input.value !== '' && 'active'}>{label}</label>
        <div className="red-text">
          {touched && error}
        </div>
      </div>
    }

    {type === 'textarea' &&
       <div className="input-field">
        <textarea {...input} id={input.name} type={type} className="materialize-textarea"></textarea>
        <label htmlFor={input.name} className={input.value !== '' && 'active'}>{label}</label>
        <div className="red-text">
          {touched && error}
        </div>
      </div>
    }

    </div>
  );
};
