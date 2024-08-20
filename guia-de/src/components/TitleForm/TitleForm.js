// src/components/TitleForm.js
import React from 'react';
import './TitleForm.css';
 

function TitleForm() {
  return (
    <div className="form-title-container form-style">
        <div className='title-box'>
            <form>
                <input className="medium-text label-form"  type="text" id="title" name="title" />            
            </form>
        </div>
        <div className='button-box'>
            <button className="button-medium small-stylized-title">PUBLICAR</button>
        </div>
    </div>
  );
}

export default TitleForm;