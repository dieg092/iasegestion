// label and text input
import React from 'react';

export default ({ input, label, type, icon, meta: { error, touched } }) => {

  return (
    <div className="input-field">
      <i className="material-icons prefix">{icon}</i>
      <input {...input} id={input.name} type={type} className="validate" />
      <label htmlFor={input.name}>{label}</label>
      <div className="red-text">
        {touched && error}
      </div>
    </div>
  );
};
