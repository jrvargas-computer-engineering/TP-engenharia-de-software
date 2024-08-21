import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function SideIcon({toggleFunction}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);
  }, []);
  
  return (
      <div className='App-side-bar'>
        <button 
          className="button-login"
          onClick={toggleFunction} // Usar onClick em vez de onChange
        >
        <img className='App-side-icon' src='img/account.png' alt='Minha Conta' />
        </button> {/* Fechar o componente Button corretamente */}
</div>

  );
}

export default SideIcon;
