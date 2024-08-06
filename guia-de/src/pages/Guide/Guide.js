import React from 'react';


export function Guide() {
    return (
        <>
        <SideIcon/>
            <p className="App-title">GUIA DE&nbsp;<AnimatedText list={professions} delay={1500} /></p>
        <SearchBar/>
        </>
    );
}