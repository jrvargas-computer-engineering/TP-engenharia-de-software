// src/pages/Guide.js
import React, { useState, useEffect } from 'react';
import './TesteGuide.css';
import Section from '../../components/Section/Section';


function transformGuideSections(guideData) {
    return guideData.GuideSections.map(section => {
        return {
            id: section.id,
            title: section.title,
            topics: section.topics.map(topic => {
                const opinions = topic.opinions?.map(opinion => ({
                    title: opinion.title,
                    user: opinion.user,
                    content: opinion.content
                })) || [];

                let hierarchy = -1; 
                let topicId = -1; 
                let childTopics = [];
                hierarchy = topic.hierarchy;
                topicId = topic.id

                if (topic.childTopics) {
                    childTopics = section.topics
                        .filter(child => child.parentId === topic.id)
                        .map(child => ({
                            ...child,
                            opinions: child.opinions?.map(opinion => ({
                                title: opinion.title,
                                user: opinion.user,
                                content: opinion.content
                            })) || [],
                            childTopics: [],
                            hierarchy: child.hierarchy,
                            topicId: child.id
                        }));
                }
                return {
                  ...topic,
                  opinions: opinions,
                  childTopics: childTopics,
                  id: topicId,
                  hierarchy: hierarchy,
                };
            })
        };
    });
}



export function TesteGuide({ guideData }) {

    /*precisa ter um guia
      com todos os seus tópicos 
      e todas as suas seções 
      e todos os seus reviews
    */

    const [sections, setSections] = useState([]);

    useEffect(() => {
        if (guideData) {
            const transformedSections = transformGuideSections(guideData);
            setSections(transformedSections);
        }
    }, [guideData]);


    return (
        <div className='guide-container'>
            <div className="main-container">
                <div className="search-container">
                </div>

                <div className="title-container"> 
                    <h1 className="main-title">{guideData.guideName}</h1>
                </div>

                <div className='content-container'>
                    <div className="grid-container">
                        {sections && sections.length > 0 && sections.map((section, index) => (
                            <Section
                                key={index}
                                title={section.title}
                                sectionId={section.id}
                                topics={section.topics.filter(topic => topic.hierarchy === 0)} // Filtra para renderizar apenas tópicos principais
                          />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TesteGuide;