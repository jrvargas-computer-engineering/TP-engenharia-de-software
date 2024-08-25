import React, { useEffect, useState } from 'react';
import './Topic.css';
import Opinion from '../../components/Opinion/Opinion';
import OpinionForm from '../../components/OpinionForm/OpinionForm';
import TitleForm from '../../components/TitleForm/TitleForm';

const addGoogleFontLink = () => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    link.rel = "stylesheet";
    document.head.appendChild(link);
};

async function getUsers(ids) {
    const queryString = ids.join(',');
    const url = `http://localhost:4000/user/?input=${queryString}`; 
    try {       
        const response = await fetch(url, {
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

export function Topic({ title, opinions, childTopics, hierarchy, topicId }) {

    const [isVisible, setIsVisible] = useState(false);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        addGoogleFontLink();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (opinions && opinions.length > 0) {
                const userIds = opinions.map(opinion => opinion.owner);
                const usersData = await getUsers(userIds);
                setUsers(usersData);
            }
            setLoading(false);
        };

        fetchUsers();
    }, [opinions]);

    const titleSize = hierarchy === 0 ? 'large-title' : 'medium-title';
    const buttonNewTopic = hierarchy === 0 ? true : false;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="topic-container">
            <div className="header-topic">
                <h1 className={titleSize}>{title}</h1>
                {buttonNewTopic && !isVisible && (
                    <>
                        <div className='new-topic-button-container ' id="container-button-subtopic">
                            <button
                                type="button"
                                onClick={toggleVisibility}
                            >
                                <span className={`material-symbols-outlined`} id="icon-new-topic">add_circle</span>
                                <span className="small-text" id="button-new-topic-text">Subtópico</span>
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="content-topic-container">
                <div className="grid-opinions-container">
                    {isVisible && (
                        <>
                            <div className="title-form-container">
                                <div className="title-form-box">
                                    <TitleForm onClick={toggleVisibility} isNestedInSection={false} parentId={topicId} />
                                </div>
                            </div>
                        </>
                    )}
                    {opinions && opinions.length > 0 && opinions.map((opinion, index) => {
                        const user = users.find(user => user.id === opinion.owner);
    
                        return (
                            <Opinion 
                                key={index} 
                                title={opinion.title} 
                                user={user && user.username ? user.username : 'Anonymous User'} 
                                content={opinion.content} 
                            />                        
                            );
                    })}
                    <div className='form-space'>
                        <div className='form-box'>
                            <OpinionForm topicId={topicId} />
                        </div>
                    </div>
                </div>
                <div className='child-topics-container'>
                    <div className="grid-topics-container">
                        {childTopics && childTopics.length > 0 && childTopics.map((childTopic, index) => (
                            <Topic key={index} title={childTopic.title} opinions={childTopic.opinions} childTopics={childTopic.childTopics} hierarchy={childTopic.hierarchy} topicId={childTopic.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topic;