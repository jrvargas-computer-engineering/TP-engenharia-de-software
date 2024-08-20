import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './OpinionForm.css';
// src/components/TitleForm.js

async function postReviewData(reviewData) {
    const url = 'https://6qd4q9qt-4000.brs.devtunnels.ms/review/create';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
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

async function getReviewData(reviewId) {
    console.log("ReviewId: ", reviewId);
    try {
        const response = await fetch(`https://6qd4q9qt-4000.brs.devtunnels.ms/review?id=${reviewId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao fazer o GET:', error);
    }
}

function OpinionForm(topicId) {    


    const jsonData = require('../../data/guides.json');

    // Estados para armazenar o conteúdo dos campos
    const [isVisible, setIsVisible] = useState(false); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const toggleVisibility = () => {
      setIsVisible(!isVisible); 
    };

    const handleSubmit = () => {

        setIsVisible(!isVisible); 

        const reviewData = {
            title: title,
            content: content,
            id: `${uuidv4()}`
        };

        postReviewData(reviewData);
        const review = getReviewData(reviewData.id);

        console.log("ReviewData: ", review);
        
        const addReviewToJson = (jsonData, topicId, reviewData) => {
          console.log("topic id antes do push: ", topicId.topicId)
          for (const section of jsonData.GuideSections) {
              for (const topic of section.topics) {
                  if (topic.id === topicId.topicId) {
                      topic.opinions.push(reviewData);
                      return jsonData;
                    }
                  }
                }
                
                console.error("Topic com topicId " + topicId + " não encontrado.");
                return jsonData;
              };
              
    const updatedJson = addReviewToJson(jsonData, topicId, reviewData);



    // Converte o JSON atualizado para uma string
    const jsonString = JSON.stringify(updatedJson, null, 2);
    console.log(jsonString);
    
  };
    
    return (
        <div className="form-opinion-container">            
            {isVisible && (
              <>
              <div className='opinion-title-box'>
                  <form>
                      <input
                          className="medium-text label-form"
                          type="text"
                          name="review-title"
                          placeholder="Título do review"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)} // Atualiza o estado com o valor do input
                      />
                  </form>
              </div>
              <div className="opinion-form-box">
                  <form className="form-style">
                      <textarea
                          className="medium-text"
                          name="review-content"
                          placeholder="Insira seu review aqui!"
                          value={content}
                          onChange={(e) => setContent(e.target.value)} // Atualiza o estado com o valor do textarea
                      />
                  </form>
              </div>
              <div className="opinion-button-box">
                  <button
                      className="button-medium small-stylized-title"
                      type="button"
                      onClick={handleSubmit} // Chama a função handleSubmit ao clicar
                  >
                      PUBLICAR
                  </button>
              </div>
              </>
            )}
           
            {!isVisible && (
              <>
            <div className="new-opinion-button-box">
                <button
                    className="button-medium-2 small-stylized-title"
                    type="button"
                    onClick={toggleVisibility } // Chama a função handleSubmit ao clicar
                >
                    NOVO REVIEW
                </button>   
            </div>
            </>
            )}
        </div>
    );
}

export default OpinionForm;