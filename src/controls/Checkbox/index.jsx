import React from 'react';
import './index.css';

export default function Checkbox ({ checked, title, onClick }) { 
  return (
    <label>
      <input 
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={onClick} />
      <label className="checkbox__title">{title}</label>
    </label>
  );
};
