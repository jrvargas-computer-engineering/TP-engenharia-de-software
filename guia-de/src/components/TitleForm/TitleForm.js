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
        window.location.reload(); // Recarrega a página após a criação do tópico
    } catch (error) {
        console.error('Erro ao fazer o POST:', error);
    }
}

async function addTopicToSection(topicData) {    
    const url = 'http://localhost:4000/section/add_topic';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                section_id: topicData.section_id,
                topic_id: topicData.topic_id
            })
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

function TitleForm({ onClick, isNestedInSection, parentId, sectionParent }) {
    const [titleTopic, setTitle] = useState('');

    const handleClick = () => {
        const newTopic = {
            id: uuidv4(),
            title: titleTopic,
            hierarchy: isNestedInSection ? 0 : 1,
            children_topics: false,
            reviews: []
        };

        postTopic(newTopic).then(() => {
            addTopicToSection({ section_id: sectionParent, topic_id: newTopic.id });
        });

        onClick(); 
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
                    onClick={handleClick}
                >PUBLICAR</button>
            </div>
        </div>
    );
}

export default TitleForm;
