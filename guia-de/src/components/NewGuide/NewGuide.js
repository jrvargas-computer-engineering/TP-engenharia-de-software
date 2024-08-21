import React, { useEffect } from 'react';
import './NewGuide.css';
import professions from '../../utils/professions';
import AnimatedText from '../../components/AnimatedText';


const addGoogleFontLink = () => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };
  

function NewGuide() {

    useEffect(() => {
        addGoogleFontLink();
      }, []);
    
/*description, name, location*/

    return (
        <div className="container-new-guide">
            <div className="main-new-guide">
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
                                <input type="text" placeholder="Título do seu GuiaDe" class="form-input small-text" />
                            </form>
                            <div >
                                <form>
                                     <span className="medium-text title-field">Descrição GuiaDe</span>
                                    <textarea placeholder="Sobre o que é o seu GuiaDe?" class="description-form small-text"></textarea>
                                </form>              
                            </div>
                            <form>
                                <span className="medium-text title-field">Localização do GuiaDe</span>
                                <input type="text" placeholder="Qual a localização do seu GuiaDe" class="form-input small-text" />
                            </form>

                        </div>
                        <div className="button-container">
                            <button className="button-new-guide-screen">
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