import React from 'react';
import './Home.css';

import SearchBar  from '../../components/SearchBar/SearchBar';
import SideIcon from '../../components/SideIcon';
import AnimatedText from '../../components/AnimatedText';
import professions from '../../utils/professions';
import CardsList from '../../components/CardsList/CardsList';


function Home() {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget sagittis turpis. Vestibulum bibendum ultricies erat at dictum. Morbi luctus mollis nisi vel pellentesque. Integer vitae rutrum quam, vitae pulvinar felis. Cras feugiat, erat nec iaculis convallis, purus tellus mollis sapien, a congue lectus massa ac elit. In fermentum tellus est, ut vulputate arcu rutrum a. Pellentesque scelerisque lacus nec convallis pellentesque. Nam et interdum tellus. Morbi ultricies arcu odio, eu ultrices nulla iaculis vitae. Vivamus semper cursus nisi vel condimentum. Sed sem ipsum, pretium sit amet iaculis in, ornare id nibh. Duis sit amet viverra nulla.";


    /* lista de guias*/
    /*precisa pegar do banco uma lista de todos os guias com esses campos*/
    const cards = [
        { id: 1,  num: "342", title: 'TESTE NUMERO TAL 1',   local:'ONLINE',abstract:text },
        { id: 2,  num: "89",  title: 'TESTE NUMERO TALLL 2', local:'ONLINE',abstract:text },
        { id: 3,  num: "55",  title: 'TESTE NUMERO TALL 3',  local:'ONLINE',abstract:text },
        { id: 4,  num: "2",   title: 'TESTE NUMERO TAL 4',   local:'ONLINE',abstract:text },
        { id: 5,  num: "98",  title: 'TESTE NUMERO TALLL 5', local:'ONLINE',abstract:text },
        { id: 6,  num: "564", title: 'TESTE NUMERO TALL 6',  local:'ONLINE',abstract:text },
        { id: 7,  num: "100", title: 'TESTE NUMERO TAL 7',   local:'ONLINE',abstract:text },
        { id: 8,  num: "65",  title: 'TESTE NUMERO TALLL 8', local:'ONLINE',abstract:text },
        { id: 9,  num: "45",  title: 'TESTE NUMERO TALL 9',  local:'ONLINE',abstract:text },
        { id: 10, num: "545", title: 'TESTE NUMERO TAL 10',  local:'ONLINE',abstract:text }
    ];
   


    return (
        <>

        <SideIcon/>
        <div className="main-home">
            <header>
                <div className="header-top">
                    <h1 className="large-stylized-title">GUIA DE&nbsp;</h1>
                    <span className="large-stylized-title">
                        <AnimatedText  list={professions} delay={1500} />
                    </span>
                </div>
                
                <div className="header-content">
                    <SearchBar/>
                </div>
            </header>

            <main>
                <div className="">
                    <div className="home-cards-container">
                        <div className="home-cards-box">
                            <CardsList cards={cards}/>
                        </div>
                    </div>
                </div>
            </main>

        </div>
        </>
    );
}

export default Home;