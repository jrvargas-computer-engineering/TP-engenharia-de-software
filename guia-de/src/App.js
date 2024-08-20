import './App.css';
import React from 'react';
import { Home } from './pages/Home';
import { MyAccount } from './pages/MyAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
<<<<<<< Updated upstream
=======
import axios from 'axios';
>>>>>>> Stashed changes

function App() {
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;

    axios.post('/login', { token })
      .then(response => {
        console.log('User login successful:', response.data);
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  };

  return (
    <GoogleOAuthProvider clientId="1081907781487-mg1jul5pngiq8vep4no71gr050mo78hk.apps.googleusercontent.com">
      <div className="App">
        <header className="App-header">
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/MyAccount" element={<MyAccount />} />
              <Route path="/AddGuide" element={<MyAccount />} />
            </Routes>
          </Router>
          <GoogleLogin
<<<<<<< Updated upstream
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
=======
            onSuccess={handleLoginSuccess}
>>>>>>> Stashed changes
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </header>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
