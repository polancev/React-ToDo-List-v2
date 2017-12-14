import React from 'react'

export default function SimpleButton({ onClick, children, type }) {
  if (!type) type = 'button';
  return (
    <button 
      type={type}
      className="simple bordered"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
