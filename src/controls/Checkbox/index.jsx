import React from 'react';
import './index.css';

export default function Checkbox({ checked, title, onClick }) {
  return (
    <span className="checkbox" onClick={onClick}>
      <input
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        onChange={onClick} />
      <span className="wrapper">
        <span className={checked ? "fa fa-fw checkbox-o fa-check-square-o" : "fa fa-fw checkbox-o fa-square-o" }></span>
      </span>
      <label className="checkbox__title">{title}</label>
    </span>
  );
};
