// src/pages/MenuTest.js
import React from 'react';
import { Link } from 'react-router-dom';

function MenuTest() {
  return (
    <div>
      <h1>Página de Testes</h1>
      <ul>
        <li>
            <Link to="/Home">
                Home
            </Link>
        </li>
        <li>
            <Link to="/Guide">
                Guide
            </Link>
        </li>
        <li>
            <Link to="/Search">
                Search
            </Link>
        </li>
        <li>
            <Link to="/AddGuide">
                AddGuide
            </Link>
        </li>
        <li>
            <Link to="/TesteGuide">
                TestGuide
            </Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuTest;
