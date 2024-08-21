// src/pages/Guide.js
import React, { useState, useEffect } from 'react';
import './Guide.css';
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

async function getTopic(id) {

    try {
        const response = await fetch(`http://localhost:4000/topic/?input=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getSection(id) {
    
    try {
        const response = await fetch(`http://localhost:4000/section/?input=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getGuide(id) {
    try {
        const response = await fetch(`http://localhost:4000/guide/?input=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }   
}

export function Guide(props) {

    /*precisa ter um guia
      com todos os seus tópicos 
      e todas as suas seções 
      e todos os seus reviews
    */

    const [sections, setSections] = useState([]);
    const [topics, setTopics] = useState([]);

    const guideId = "3a091c40-9f32-421f-a38c-d6b4ed5ddd44";
    let guide = getGuide(guideId);


    if (guide && guide.sections) {
        for (const sectionId of guide.sections) {
            let section = getSection(sectionId);
            sections.push(section);
    
            if (section && section.topics) {
                for (const topicId of section.topics) {
                    let topic = getTopic(topicId);
                    topics.push(topic);
                }
            }
        }
    }
    

    //const [sections, setSections] = useState([]);

    useEffect(() => {
        console.log("Sections: ", sections);
        console.log("Topics: ", topics);
    //    if (guideData) {
    //        const transformedSections = transformGuideSections(guideData);
    //       setSections(transformedSections);
    //    }
    }, [sections, topics]);


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

export default Guide;