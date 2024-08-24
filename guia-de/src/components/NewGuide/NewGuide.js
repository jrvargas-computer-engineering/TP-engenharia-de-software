import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './NewGuide.css';

const addGoogleFontLink = () => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    link.rel = "stylesheet";
    document.head.appendChild(link);
};

async function postGuide(guideData) {
    const url = 'http://localhost:4000/guide/create';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guideData)
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Resposta do servidor:', data);
    } catch (error) {
        console.error('Erro ao fazer o POST:', error);
    }
}

async function postSection(sectionData) {
    const url = 'http://localhost:4000/section/create';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sectionData)
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Resposta do servidor:', data);
    } catch (error) {
        console.error('Erro ao fazer o POST:', error);
    }
}

function NewGuide({ toggleFunction }) {

    useEffect(() => {
        addGoogleFontLink();
    }, []);
   
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [first, setFirst] = useState('');

    const handleSubmit = () => {
        // Obter o ID do usuário do localStorage (que foi salvo após o login)
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        let userId = storedUserInfo?.id;

        if (!userId) {
            userId = "Anonymous";
        }

        // Criando o objeto com os dados coletados
        const guideData = {
            id: uuidv4(),
            name: title,
            description: description,
            location: {
                city: location,
                state: '',  
                country: '' 
            },
            sections: [
                uuidv4(),
            ],
            user_id: userId // Incluindo o ID do usuário
        };

        const sectionData = {
            id: guideData.sections[0],
            title: first, 
            topics: []
        }; 

        console.log(guideData);
        console.log(sectionData);

        postGuide(guideData);
        postSection(sectionData);
    };

    return (
        <div className="container-new-guide">
            <div className="main-new-guide">
                <button 
                    onClick={toggleFunction}>
                    <span className={`material-symbols-outlined`} id="icon-close">close</span>
                </button>
                <div className="left-side">
                    <div className="new-guide-animation">
                        <h1 className="medium-stylized-title" id="animation">GUIA DE&nbsp;</h1>
                    </div>
                </div>

                <div className="right-side">
                    <div className="content-right">
                        <div className="fields-container">
                            <form>
                                <span className="medium-text title-field">Titulo</span>
                                <input 
                                    type="text" 
                                    placeholder="Título do seu GuiaDe" 
                                    className="form-input small-text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} 
                                />
                            </form>
                            <div >
                                <form>
                                    <span className="medium-text title-field">Descrição GuiaDe</span>
                                    <textarea 
                                        placeholder="Sobre o que é o seu GuiaDe?" 
                                        className="description-form small-text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}> 
                                    </textarea>
                                </form>              
                            </div>
                            <form>
                                <span className="medium-text title-field">Localização</span>
                                <input 
                                    type="text" 
                                    placeholder="Qual a localização do seu GuiaDe" 
                                    className="form-input small-text" 
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)} 
                                />
                            </form>
                            <form>
                                <span className="medium-text title-field">Primeira Seção</span>
                                <input 
                                    type="text" 
                                    placeholder="Qual a primeira seção do seu GuiaDe?" 
                                    className="form-input small-text" 
                                    value={first}
                                    onChange={(e) => setFirst(e.target.value)} 
                                />
                            </form>

                        </div>
                        <div className="button-container">
                            <button 
                                className="button-new-guide-screen"
                                type="button"
                                onClick={handleSubmit}>
                                <div className="button-new-guide-content">
                                    <span className={`material-symbols-outlined`} id="icon-new-guide-screen">add_circle</span>
                                    <h1 className="small-stylized-title">CRIAR GUIA</h1>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default NewGuide;
