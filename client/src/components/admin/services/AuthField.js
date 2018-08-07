import React from 'react';

export default ({ input, value, label, type, options, meta: { error, touched } }) => {

  return (
    <div>
      {type !== 'file'  &&
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
    </div>
  );
};
