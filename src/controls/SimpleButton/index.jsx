import React from 'react'

export default function SimpleButton({ onClick, children }) {
  return (
    <button className="simple bordered" onClick={onClick}>
      {children}
    </button>
  );
};
