import React from 'react';

export default ({ input, value, label, type, options, meta: { error, touched } }) => {

  return (
    <div>
      {type === 'text' &&
         <div className="input-field col s12 m6 l2">
          <input {...input} id={input.name} type={type} className={input.name !== 'population' ? 'validate' : 'autocomplete' } />
          <label htmlFor={input.name} className={input.value !== '' && 'active'}>{label}</label>
          <div className="red-text">
            {touched && error}
          </div>
        </div>
      }

      {type === 'select' &&
        <div className="input-field col s12 m6 l2">
          <select {...input} id={input.name}>
            <option key={0} selected></option>
            {options.map((option, key) => {
              return (
                <option key={key} value={option}>{option}</option>
              )
            })}
          </select>
          <label>{label}</label>
        </div>
      }
    </div>
  );
};
