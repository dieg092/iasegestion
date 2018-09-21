import React from 'react';

export default ({ input, value, label, type, options, pathname, meta: { error, touched } }) => {

  return (
    <div>
      {type === 'text' && (pathname && pathname !=='impuestos' && input.name === 'number') ?
      ''
      : (type !== 'select' &&
          <div className="input-field col s12 m6 l3">
            <input {...input} id={input.name} type={type} className={input.name !== 'client' ? 'validate' : 'autocomplete' } />
            <label htmlFor={input.name} className={input.value !== '' && 'active'}>{label}</label>
            <div className="red-text">
              {touched && error}
            </div>
          </div>
        )
      }

      {type === 'select' && (pathname && pathname !== 'financiero' || pathname ===' impuestos') ?
        ''
      : type === 'select' &&
        <div className="input-field col s12 m6 l3">
          <select {...input} id={input.name}>
            <option key={0} selected></option>
            {options && options.map((option, key) => {
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
