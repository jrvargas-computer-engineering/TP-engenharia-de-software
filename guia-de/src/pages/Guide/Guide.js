// Guide.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Guide.css';
import Section from '../../components/Section/Section';

const addGoogleFontLink = () => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    link.rel = "stylesheet";
    document.head.appendChild(link);
};


async function getReviews(ids) {
    try {
        const queryString = ids.join(',');
        const response = await fetch(`http://localhost:4000/review/?input=${queryString}`, {
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

async function getTopics(ids) {
    try {
        const queryString = ids.join(',');
        const response = await fetch(`http://localhost:4000/topic/?input=${queryString}`, {
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

async function getSections(ids) {
    try {
        const queryString = ids.join(',');
        const response = await fetch(`http://localhost:4000/section/?input=${queryString}`, {
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

    const navigate = useNavigate();


    const { guideId } = useParams(); 

    const handleClick = () => {
        navigate(`/home`);
    };
    


    const [guide, setGuide] = useState([]);
    const [sections, setSections] = useState([]);
    const [topics, setTopics] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        addGoogleFontLink();
    }, []);

    console.log("id: " + guideId);
    useEffect(() => {
        async function fetchData(guideId) {     
            // 1. Fetch Guides
            const guideData = await getGuide(guideId);
            
            if (!guideData) {
                setLoading(false);
                return null;
            }

            if (!guideData.sections) {
                setLoading(false);
                return null;
            }
            // 2. Collect all sections from one guide
            const allSectionsIds = guideData.sections;
            const sectionsData = await getSections(allSectionsIds);

            // 3. Collect all topic IDs from all sections
            const allTopicIds = sectionsData.flatMap(section => section.topics || []);
            const topicsData = await getTopics(allTopicIds);

            // 4. Collect all reviews from all topics
            const allReviewIds = topicsData.flatMap(topic => topic.reviews || []);
            const reviewsData = await getReviews(allReviewIds);

            // 5. Set state with all collected data
            setGuide(guideData);
            setSections(sectionsData);
            setTopics(topicsData);
            setReviews(reviewsData);
            setLoading(false);
        }

        // Example usage with a list of guide IDs
        fetchData(guideId);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='guide-container'>
            <span className={`material-symbols-outlined`} 
                  id="icon-back"
                  onClick={handleClick}
                  >
                    arrow_back
            </span>

            <div className="main-container">
                <div className="title-container"> 
                    <h1 className="main-title">{guide.name}</h1>
                    <h2 className="guide-description medium-text">{guide.description}</h2>
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