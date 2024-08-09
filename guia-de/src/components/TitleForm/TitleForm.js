// src/components/TitleForm.js
import React from 'react';

function TitleForm() {
  return (
    <div className="form-container">
        <div className='title-box'>
            <form>
                <div className='title-content'>
                    <label>Título aqui</label>
                </div>
            </form>
        </div>
        <div className='button-box'>
            <button>PUBLICAR</button>
        </div>
    </div>
  );
}

export default TitleForm;