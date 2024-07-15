import React from 'react';
import { SearchButton } from './SearchButton';

export function SearchBar() {
  return (
    <>
      <label className='App-search-component'>
        <code>&nbsp;&#x1F50E;&#xFE0E;&nbsp;</code>
        <input className='App-search-box' placeholder='Pesquisar' />
      </label>
      <SearchButton />
    </>
  );
}
