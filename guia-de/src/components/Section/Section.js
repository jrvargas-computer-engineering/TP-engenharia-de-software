// src/components/Section.js
import React, { useState } from 'react';
import './Section.css';
import  Topic from '../../components/Topic/Topic';
import  TitleForm from '../../components/TitleForm/TitleForm';


//onClick, isNestedInSection, id, parentId, sectionParent, guideParent
function Section({title, topics, sectionId, reviews}) { 

    const [isVisible, setIsVisible] = useState(false); 

    const toggleVisibility = () => {
        setIsVisible(!isVisible); 
      };
      
    return (
        <div className="section-container">
            <div className="header-container">
                <h1 className={"medium-stylized-title section-title"}>{title}</h1>

                    {!isVisible && (
                        <>
                        <div className='new-topic-button-container'>
                            <button
                                type="button"
                                onClick={toggleVisibility} 
                            >
                                <span className={`material-symbols-outlined`} id="icon-new-topic">add_circle</span>
                                 <span className="small-text" id="button-new-topic-text">Tópico</span>
                            </button>
                        </div>
                        </>
                    )}
            </div>
            <div className='title-form-container'>
                <div className="title-form-box">
                    {isVisible && (
                        <>
                        <TitleForm onClick={toggleVisibility} isNestedInSection={true} sectionParent={sectionId}/>
                    </>
                    )}
                </div>
            </div>
            
            
            <div className="content-container">
                <div className="grid-container">
                    {topics && topics.length > 0 && topics.map((topic, index) => {
                        const topic_reviews = reviews.filter(review => {
                        return topic.reviews.includes(review.id); // Verifica se o ID do review está no array de IDs
                        });

                        return (
                        <Topic
                            key={index}
                            title={topic.title}
                            opinions={topic_reviews}
                            childTopics={topic.childTopics}
                            hierarchy={topic.hierarchy}
                            topicId={topic.id}
                        />
                        );
                    })}
                </div>
            </div>
        </div>
    );

}

export default Section;