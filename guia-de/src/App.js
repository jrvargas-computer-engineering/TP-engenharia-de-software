import './App.css';
import React from 'react';
import { SearchBar } from './components/SearchBar';
import { SideIcon } from './components/SideIcon';
import { AnimatedText } from './components/AnimatedText';


const professions = [
  "Engenheiros", 
  "Médicos", 
  "Professores", 
  "Advogados", 
  "Programadores", 
  "Designers", 
  "Arquitetos", 
  "Enfermeiros", 
  "Farmacêuticos", 
  "Dentistas",
  "Psicólogos",
  "Fisioterapeutas",
  "Nutricionistas",
  "Veterinários",
  "Biólogos",
  "Químicos",
  "Físicos",
  "Astrônomos",
  "Geólogos",
  "Meteorologistas"
];


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
