import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Guide from "../../pages/Guide/Guide"
import './CardSearch.css';

const addGoogleFontLink = () => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";   
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };
  

function CardSearch({ num, title, local, abstract, id }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
      // Redireciona para a rota Guide passando o guideId
      navigate(`/guide/${id}`);
    };

    useEffect(() => {
        addGoogleFontLink();
    }, []);

    console.log(id)

    return (
      <div className="card-container"
           onClick={handleCardClick}
      >
            <div className="card-box">
                <div className="card-header">
                    <div className="card-num-box">
                            <div id="num-content">
                            <span className='small-stylized-title' id="num">{num}</span>
                            <span className={`material-symbols-outlined`} id="icon-voice">voice_selection</span>
                            </div>
                    </div>
                    <h1 className="medium-stylized-title">{title}</h1>
                    <div className="localization-box"> 
                        <span className={`material-symbols-outlined`} id="icon-pin">pin_drop</span>
                        <span className="small-title">{local}</span>
                    </div>
                </div>
                <div className="card-content">
                    <p className={"small-text"}>{abstract}</p>
                </div>
            </div>
      </div>
    );
}

export default CardSearch;

