import React, { useEffect, useState } from 'react';
import './CardsList.css';
import CardSearch from '../CardSearch/CardSearch';

const addGoogleFontLink = () => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    link.rel = "stylesheet";
    document.head.appendChild(link);
};

function CardsList({ cards, toggleFunction}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        addGoogleFontLink();

        const token = localStorage.getItem('userToken');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <div className="card-grid-container">
            <div className="column-a">
                {isAuthenticated && (
                    <div className="button-container">
                        <button 
                            className="button-new-guide"
                            onClick={toggleFunction}    
                        >
                            <div className="button-new-guide-content">
                                <span className="material-symbols-outlined" id="icon-new-guide">add_circle</span>
                                <h1 className="medium-stylized-title">CRIAR SEU GUIA</h1>
                            </div>
                        </button>
                    </div>
                )}
                {cards.filter((_, index) => index % 2 === 0).map((card, index) => (
                    <CardSearch key={index} {...card} />
                ))}
            </div>
            <div className="column-b">
                {cards.filter((_, index) => index % 2 !== 0).map((card, index) => (
                    <CardSearch key={index} {...card} />
                ))}
            </div>
        </div>
    );
}

export default CardsList;