import './App.css';
import React from 'react';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
          </Routes>
        </Router>  
      </header>
    </div>
  );
}



export default App;
