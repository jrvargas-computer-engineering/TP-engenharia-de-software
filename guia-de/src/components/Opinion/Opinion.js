// src/components/Opinion.js
import React from 'react';
import './Opinion.css';

function Card({ title, subtitle, text }) {
  return (
    <div className="opinion">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>{text}</p>
    </div>
  );
}

export default Card;