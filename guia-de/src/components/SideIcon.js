import React from 'react';
import { Link } from 'react-router-dom';


export function SideIcon() {
  return (
    <div className='App-side-bar'>
      <Link to='/MyAccount'>
        <img className='App-side-icon' src='img/account.png' alt='Minha Conta' />
      </Link>
      <Link to='/AddGuide'>
        <img className='App-side-icon' src='img/add.png' alt='Adicionar ...' />
      </Link>
    </div>
  );
}
