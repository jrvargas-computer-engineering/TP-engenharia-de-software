// src/pages/Topic.js
import React, { useEffect } from 'react';
import './Topic.css';
import  Opinion from '../../components/Opinion/Opinion';
import OpinionForm from '../../components/OpinionForm/OpinionForm';



const addGoogleFontLink = () => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };
  

export function Topic({title, opinions, childTopics, hierarchy, topicId}) {  
    
    console.log("topic id dentro do topic", topicId);

    useEffect(() => {
        addGoogleFontLink();
      }, []);

    const titleSize = hierarchy === 0 ? 'large-title' : 'medium-title';
    const imgSize = hierarchy === 0 ? 'parent-icon' : 'child-icon';

    return (
    <div className="topic-container"> 
        <div className="header-topic">
            <span className={`material-symbols-outlined ${imgSize}`}  >add_circle</span>
            <h1 className={titleSize}>{title}</h1>
        </div>
        <div className="content-topic-container">
            <div className="grid-opinions-container">
                {opinions && opinions.length > 0 && opinions.map((opinion, index) => (
                    <Opinion key={index} title={opinion.title} user={opinion.user} content={opinion.content} />
                ))}
            </div>
            <div className='form-space'>
                <div className='form-box'>
                    <OpinionForm topicId = {topicId}/>
                </div>
            </div>
            <div className='child-topics-container'>
                <div className="grid-topics-container">
                    {childTopics && childTopics.length > 0 && childTopics.map((childTopic, index)  => (
                        <Topic key={index} title={childTopic.title} opinions={childTopic.opinions} childTopics={childTopic.childTopics} hierarchy={childTopic.hierarchy} topicId={childTopic.id} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Topic;