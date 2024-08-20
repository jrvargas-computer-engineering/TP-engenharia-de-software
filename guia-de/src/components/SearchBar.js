import React, { useState } from 'react';
import axios from 'axios';
import { SearchButton } from './SearchButton';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Função para lidar com a pesquisa
  const handleSearch = async () => {
    try {
      const response = await axios.get('/guides/search', {
        params: { name: query }
      });
      setResults(response.data.guides);
    } catch (error) {
      console.error('Error searching guides:', error);
    }
  };

  // Função para lidar com a mudança no campo de pesquisa
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Função para lidar com o clique no botão de pesquisa
  const handleClick = () => {
    handleSearch();
  };

  return (
    <>
      <label className='App-search-component'>
        <code>&nbsp;&#x1F50E;&#xFE0E;&nbsp;</code>
        <input
          className='App-search-box'
          placeholder='Pesquisar'
          value={query}
          onChange={handleChange}
        />
      </label>
      <SearchButton onClick={handleClick} />
      <div className='search-results'>
        {results.length > 0 ? (
          results.map((guide) => (
            <div key={guide.id} className='result-item'>
              <h3>{guide.name}</h3>
              <p>{guide.description}</p>
            </div>
          ))
        ) : (
          <p>Nenhum guia encontrado.</p>
        )}
      </div>
    </>
  );
}
