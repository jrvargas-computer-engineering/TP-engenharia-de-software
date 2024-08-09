// src/components/Section.js
import React from 'react';
import './Section.css';
import  Topic from '../../components/Topic/Topic';

function Section({title, topics}) {
  return (

    <div className="section-container">
        <div className="header-container">
            <span className={`material-symbols-outlined`}>add_circle</span>
            <h1 className={"stylized-title"}>{title}</h1>
        </div>
        <div className="content-container">
            <div className="grid-container">
                {topics && topics.length > 0 && topics.map((topic, index) => (
                    <Topic key={index} title={topic.title} opinions={topic.opinions} childTopics={topic.childTopics} hierarchy={topic.hierarchy}/>
                ))}
            </div>
        </div>


    </div>
  );
}

export default Section;