import './styles/App.css';
import React from 'react';
import Home  from './pages/Home/Home';
import Guide from './pages/Guide/Guide'
import Search from './pages/Search/Search'
import AddGuide from './pages/AddGuide/AddGuide'
import MenuTest from './pages/MenuTest/MenuTest';
import MyAccount from './pages/MyAccount/MyAccount';
import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {

  
  const data = require('.//data/guides.json');
  const [search, setSearch] = useState("");
  const [performSearch, setPerformSearch] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path="/" element={<MenuTest/>}/>
            <Route 
              path="/Home" 
              element={<Home 
                        text = "Pesquisar" 
                        type="text" 
                        placeholder='Pesquisar'
                        valueSearch={search}
                        valuePerformSearch={performSearch}
                        setSearch={setSearch}
                        setPerformSearch={setPerformSearch}
                      />}
            />
            <Route path="/Guide" element={<Guide guideData={data}/>}/>
            <Route path="/Search" element ={<Search/>}/>
            <Route path="/MyAccount" element={<MyAccount/>}/>
            <Route path="/AddGuide" element={<AddGuide/>}/>
          </Routes>
        </Router>  
      </header>
    </div>
  );
}



export default App;
