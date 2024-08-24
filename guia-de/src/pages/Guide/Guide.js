import React, { useState, useEffect } from 'react';
import './Guide.css';
import Section from '../../components/Section/Section';

async function getReview(id, sectionId) {
    try {
        const response = await fetch(`http://localhost:4000/review/?input=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) { 
            throw new Error(`HTTP error! status: ${response.status}`);
        }   

        const data = await response.json(); 
        return { ...data, sectionId }; // Adiciona sectionId ao review
    } catch (error) {
        console.error('Error fetching review data:', error);
    }
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
        console.error('Error fetching topic data:', error);
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
        console.error('Error fetching section data:', error);
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
    } catch (error) {
        console.error('Error fetching guide data:', error);
    }
}

export function Guide() {
    const [guide, setGuide] = useState(null);
    const [sections, setSections] = useState([]);
    const [topics, setTopics] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const guideId = "das1";

            // 1. Fetch Guide
            const guideData = await getGuide(guideId);
            console.log(guideData.sections);
            if (guideData) {
                setGuide({
                    id: guideData.id,
                    name: guideData.name,
                    location: guideData.location || 'UNKNOWN',
                    description: guideData.description,
                    sections: guideData.sections || [],
                });

                console.log("guideData", guideData);

                // 2. Fetch Sections
                const sectionsData = await Promise.all(
                    guideData.sections.map(sectionId => getSection(sectionId))
                );

                console.log("sectionsData", sectionsData);

                setSections(sectionsData);

                // 3. Fetch Topics for each Section
                const topicsData = await Promise.all(
                    sectionsData.flatMap(section => 
                        section.topics.map(topicId => getTopic(topicId))
                    )
                );

                console.log("topicsData", topicsData);
                setTopics(topicsData);

                // 4. Fetch Reviews for each Topic
                const reviewsData = await Promise.all(
                    topicsData.flatMap(topic => 
                        Array.isArray(topic.reviews) ? topic.reviews.map(reviewId => getReview(reviewId, topic.sectionId)) : []
                    )
                );

                console.log("reviewsData", reviewsData);
                setReviews(reviewsData);

                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='guide-container'>
            <div className="main-container">
                <div className="title-container"> 
                    <h1 className="main-title">{guide?.name}</h1>
                </div>

                <div className='content-container'>
                    <div className="grid-container">
                        {sections.map((section, index) => (
                            <Section
                                key={index}
                                title={section.title}
                                sectionId={section.id}
                                topics={topics}
                                reviews={reviews}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Guide;