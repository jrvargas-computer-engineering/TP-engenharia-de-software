import './App.css';
import React from 'react';
import { SearchBar } from './components/SearchBar';
import { SideIcon } from './components/SideIcon';
import { AnimatedText } from './components/AnimatedText';
import { professions } from './professions';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SideIcon/>
        <p className="App-title">GUIA DE<code>&nbsp;</code><AnimatedText list={professions} delay={1500} /></p>
        <SearchBar/>
      </header>
    </div>
  );
}



export default App;
