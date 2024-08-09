// src/components/Opinion.js
import React from 'react';
import './Opinion.css';

function Opinion({ title, user, content }) {
  return (
    <div className="opinion-box">
        <div className="opinion-container">
            <div className="opinion-header">
                <h1 className="small-title">{title}</h1>
                <h2 className="small-user">{user}</h2>
            </div>
        </div>
        <div className="opinion-container">
            <div className="opinion-content">
                <p className='small-text'>{content}</p>
            </div>
        </div>
    </div>
  );
}

export default Opinion;