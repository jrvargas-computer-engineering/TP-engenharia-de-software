import React, { useEffect } from 'react';
import './SearchBar.css';



const addGoogleFontLink = () => {
  const link = document.createElement('link');
  link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};



function SearchBar() {

  useEffect(() => {
    addGoogleFontLink();
  }, []);

  return (
    <>
      <div className='searchbar-container'>
        <span className={`material-symbols-outlined`} id="search-icon">search</span>
        <input className='search-box medium-text' placeholder='Pesquisar' />
      </div>
    </>
  );
}

export default SearchBar;