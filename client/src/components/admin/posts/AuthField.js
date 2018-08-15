import React from 'react';

export default ({ input, value, label, type, options, meta: { error, touched } }) => {

  return (
    <div>
      {type !== 'file' && type !== 'select' &&
         <div className="input-field col s12">
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

      {type === 'select' &&
        <div className="input-field col s12">
          <div className="selDiv">
            <select {...input} id={input.name}>
              <option key={0}></option>
              {options.map((option, key) => {
                return (
                  <option key={key} value={option}>{option}</option>
                )
              })}
            </select>
            <label>{label}</label>
          </div>
        </div>
      }
    </div>
  );
};
