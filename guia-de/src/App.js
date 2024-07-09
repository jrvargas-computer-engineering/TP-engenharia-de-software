import './App.css';

function SearchBar(){
  return(
    <label className='App-search-component'>
      <td>&nbsp;&#x1F50E;&#xFE0E;&nbsp;</td>
      <input className='App-search-box' type="text" placeholder="Pesquisar"/>
    </label>
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
        <p className="App-title">GUIA DE</p>
        <SearchBar/>
      </header>
    </div>
  );
}



export default App;
