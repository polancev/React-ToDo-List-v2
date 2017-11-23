import React from 'react';
import './index.css';

const Checkbox = ({ checked, title, onClick }) => 
  <label>
    <input 
      type="checkbox"
      className="checkbox"
      checked={checked}
      onChange={onClick} />
    <span className="todo__title">{title}</span>
  </label>

export default Checkbox;
