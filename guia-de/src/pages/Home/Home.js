import React, { useState, useEffect } from 'react';
import './Home.css';

import SearchBar from '../../components/SearchBar/SearchBar';
import SideIcon from '../../components/SideIcon';
import AnimatedText from '../../components/AnimatedText';
import professions from '../../utils/professions';
import CardsList from '../../components/CardsList/CardsList';

async function getAllGuides() {
    try {
        const response = await fetch(`http://localhost:4000/guide/all`, {
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

async function searchGuides(query) {
    try {
        const response = await fetch(`http://localhost:4000/guide/search?input=${query}`, {
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

function Home(props) {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState("");
    const [performSearch, setPerformSearch] = useState(false);
    const [loadTrends, setLoadTrends] = useState(true);

    useEffect(() => {
        async function fetchGuides() {
            const allGuides = await getAllGuides();
            if (allGuides) {
                const formattedCards = allGuides.map((guide, index) => ({
                    id: guide.id, // Pode ajustar o ID conforme necessário
                    num: index + 1, // Usando o campo 'id' do objeto como 'num'
                    title: guide.name, // Usando o campo 'name' do objeto como 'title'
                    local: guide.location.city || 'UNKNOWN', // Assumindo que 'location' tem um campo 'city'
                    abstract: guide.description // Substitua 'text' pelo conteúdo adequado
                }));
                setCards(formattedCards);
            }
        }
        async function fetchSearch(query) {
            const searchedGuides = await searchGuides(query);
            if (searchedGuides) {
                const formattedCards = searchedGuides.map((guide, index) => ({
                    id: guide.id, // Pode ajustar o ID conforme necessário
                    num: index + 1, // Usando o campo 'id' do objeto como 'num'
                    title: guide.name, // Usando o campo 'name' do objeto como 'title'
                    local: guide.location.city || 'UNKNOWN', // Assumindo que 'location' tem um campo 'city'
                    abstract: guide.description // Substitua 'text' pelo conteúdo adequado
                }));
                setCards(formattedCards);
            }
        }
        if(loadTrends) {
            fetchGuides();
            setLoadTrends(false);
        }

        if(performSearch) {
            fetchSearch(search);
            setPerformSearch(false);
        }
    }, [loadTrends, performSearch]);

    return (
        <>
            <SideIcon />
            <div className="main-home">
                <header>
                    <div className="header-top">
                        <h1 className="large-stylized-title">GUIA DE&nbsp;</h1>
                        <span className="large-stylized-title">
                            <AnimatedText list={professions} delay={1500} />
                        </span>
                    </div>

                    <div className="header-content">
                        <SearchBar 
                            type="text" 
                            placeholder='Pesquisar'
                            value={search}
                            handleChange={setSearch}
                            handleEnterPress={setPerformSearch} />
                    </div>
                </header>

                <main>
                    <div className="">
                        <div className="home-cards-container">
                            <div className="home-cards-box">
                                <CardsList cards={cards} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Home;