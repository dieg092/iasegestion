import React from 'react';

export default ({ input, value, label, type, options, meta: { error, touched }, selected, tax }) => {

  return (

    <div>
    {console.log(tax)}
    {input.name === "number" && tax === false ?
      ''
    : type !== 'file' && type !== 'select' &&
         <div className="input-field col s12">
          {type === 'textarea' ?
            <textarea {...input} id={input.name} type={type} className='materialize-textarea'></textarea>
          :
            <input {...input} id={input.name} type={type} className={input.name !== 'client' ? 'validate' : 'autocomplete' } />
          }

          <label htmlFor={input.name} className={input.value !== '' && 'active'}>{label}</label>
          <div className="red-text">
            {touched && error}
          </div>
        </div>
    }

      {type === 'select' && !tax &&
        <div className="input-field col s12">
          <div className="selDiv" id="selDiv">
            <select {...input} value={selected && selected.type ? selected.type : ''}>
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
