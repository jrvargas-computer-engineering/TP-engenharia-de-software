import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './OpinionForm.css';

async function postReviewData(reviewData) {
    const url = 'http://localhost:4000/review/create';
    
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
        window.location.reload(); // Recarrega a página após a criação da opinião
    } catch (error) {
        console.error('Erro ao fazer o POST:', error);
    }
}

async function addReviewToTopic(reviewData) {
    const url = 'http://localhost:4000/topic/add_review';   
    try {   
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic_id: reviewData.topic_id,
                review_id: reviewData.review_id
            })
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Resposta do servidor:', data);
    }       
    catch (error) {
        console.error('Erro ao fazer o POST:', error);
    }      
}

function OpinionForm({ topicId }) {    
    const jsonData = require('../../data/guides.json');

    const [isVisible, setIsVisible] = useState(false); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (storedUserInfo) {
            setUserId(storedUserInfo.id);
        }
    }, []);

    const toggleVisibility = () => {
        setIsVisible(!isVisible); 
    };

    const handleSubmit = () => {
        setIsVisible(!isVisible); 
        const reviewData = {
            title: title,
            content: content,
            id: `${uuidv4()}`,
            owner: userId ? userId : "Anonymous"
        };

        postReviewData(reviewData).then(() => {
            addReviewToTopic({ topic_id: topicId, review_id: reviewData.id });
        });
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
                          onChange={(e) => setTitle(e.target.value)}
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
                          onChange={(e) => setContent(e.target.value)}
                      />
                  </form>
              </div>
              <div className="opinion-button-box">
                  <button
                      className="button-medium small-stylized-title"
                      type="button"
                      onClick={handleSubmit}
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
                    onClick={toggleVisibility}
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
