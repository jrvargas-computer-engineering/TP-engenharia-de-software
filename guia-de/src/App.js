import './styles/App.css';
import React from 'react';
import Home  from './pages/Home/Home';
import Guide from './pages/Guide/Guide'
import Search from './pages/Search/Search'
import AddGuide from './pages/AddGuide/AddGuide'
import MenuTest from './pages/MenuTest/MenuTest';
import MyAccount from './pages/MyAccount/MyAccount';
import TesteGuide from './pages/TesteGuide/TesteGuide';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const data = require('.//data/guides.json');
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<MenuTest/>}/>
            <Route 
              path="/Home" 
              element={<Home />}
            />
            <Route path="/Guide/:guideId" element={<Guide/>}/>
            <Route path="/Search" element ={<Search/>}/>
            <Route path="/MyAccount" element={<MyAccount/>}/>
            <Route path="/AddGuide" element={<AddGuide/>}/>
            <Route path="/TesteGuide" element={<TesteGuide guideData={data}/>}/>

          </Routes>
        </Router>  
    </div>
  );
}



export default App;
