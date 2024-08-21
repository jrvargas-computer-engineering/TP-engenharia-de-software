import React from 'react';
import SearchButton from './SearchButton';

function SearchBar(props) {
  return (
    <>
      <label className='App-search-component'>
        <code>&nbsp;&#x1F50E;&#xFE0E;&nbsp;</code>
        <input  
              className='App-search-box' 
              type = {props.type}
              placeholder={props.placeholder} 
              onChange={(e) => props.setSearch(e.target.value)}/>
      </label>
      <SearchButton 
        text={props.text} 
        setPerformSearch = {props.setPerformSearch} 
      />
    </>
  );
}

export default SearchBar;

