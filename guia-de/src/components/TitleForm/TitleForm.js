// src/components/TitleForm.js
import React, { useState } from 'react';
import './TitleForm.css';
 

function TitleForm({onClick, isNestedInSection, id, parentId, sectionParent, guideParent}) {

    const [titleTopic, setTitle] = useState('');

    const handleClick = () => {
        let jsonResult;
    
        if (isNestedInSection) {
            jsonResult = {
                id: id,
                title: titleTopic,
                childTopics: false,
                hierarchy: 0,
                parentId: null,
                sectionParent: sectionParent,
                opinions: []
            };
        } else {
            console.log("ta num topico");
            jsonResult = {
                id: id,
                title: titleTopic,
                childTopics: false,
                hierarchy: 1,
                parentId: parentId,
                sectionParent: null,
                opinions: []
          };
        }
    
        console.log(JSON.stringify(jsonResult, null, 2));
      };


  return (
    <div className="form-title-container form-style">
        <div className='title-box'>
            <form>
                <input 
                    className="medium-text label-form"  
                    type="text" 
                    id="title" 
                    name="title" 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Insira o título"
                />            
            </form>
        </div>
        <div className='button-box'>
            <button 
                className="button-medium small-stylized-title"
                onClick={() => { onClick(); handleClick(); }}
            >PUBLICAR</button>
        </div>
    </div>
  );
}

export default TitleForm;