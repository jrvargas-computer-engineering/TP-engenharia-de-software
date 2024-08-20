import React from 'react';
import SearchBar from '../../components/SearchBar';
import SideIcon from '../../components/SideIcon';
import AnimatedText from '../../components/AnimatedText';
import professions from '../../utils/professions';

function Home(props) {
    return (
        <>
            <SideIcon/>
            <p className="App-title">GUIA DE&nbsp;<AnimatedText list={professions} delay={1500} /></p>
            <SearchBar
                text = {props.text}
                placeholder = {props.placeholder}
                setSearch = {props.setSearch}
                setPerformSearch = {props.setPerformSearch}
            />
            <p>{props.valueSearch} - {props.valuePerformSearch? "True":"False"}</p>
        </>
    );
}

export default Home;