import './App.css';
import React, {useState, useEffect} from 'react';


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


const AnimatedText = ({list, delay}) =>{
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex === list.length) setCurrentIndex(0);
    if (currentIndex < list.length) {
      const timeout = setTimeout(() => {
        setCurrentText(list[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, list]);

  return <span>{currentText}</span>
}

function SearchButton(){
  return(
    <button className='App-button' type='button'>Pesquisar</button>
  )
}

function SearchBar(){
  return(
    <>
      <label className='App-search-component'>
        <code>&nbsp;&#x1F50E;&#xFE0E;&nbsp;</code>
        <input className='App-search-box' placeholder='Pesquisar'/>
      </label>
      <SearchButton />
    </>
  )
}



function SideIcon(){
  return(
    <div className='App-side-bar'>
      <img className='App-side-icon' src='img/account.png' alt='Minha Conta'/>
      <img className='App-side-icon' src='img/add.png' alt='Adicionar ...'/>
    </div>
  )
}

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
