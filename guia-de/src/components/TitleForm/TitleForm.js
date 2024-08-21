// src/components/TitleForm.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TitleForm.css';
 


async function postTopic(topicData) {
    const url = 'http://localhost:4000/topic/create';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(topicData)
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Resposta do servidor:', data);
    } catch (error) {
        console.error('Erro ao fazer o POST:', error);
    }
}
      


function TitleForm({onClick, isNestedInSection, id, parentId, sectionParent, guideParent}) {

    const [titleTopic, setTitle] = useState('');

    const handleClick = () => {
        let jsonResult;
    
        if (isNestedInSection) {
            jsonResult = {
                id: uuidv4(),
                title: titleTopic,
                hierarchy: 0,
                children_topics: false,
                reviews: []
            };
        } else {
            console.log("ta num topico");
            jsonResult = {
                id: uuidv4(),
                title: titleTopic,
                hierarchy: 1,
                children_topics: false,
                reviews: []
          };
        }
    
        postTopic(jsonResult);
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