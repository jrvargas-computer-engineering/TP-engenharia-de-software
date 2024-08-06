import './styles/App.css';
import React from 'react';
import { Home } from './pages/Home/Home';
import { MyAccount } from './pages/MyAccount/MyAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/MyAccount" element={<MyAccount/>}/>
            <Route path="/AddGuide" element={<MyAccount/>}/>
          </Routes>
        </Router>  
      </header>
    </div>
  );
}



export default App;
