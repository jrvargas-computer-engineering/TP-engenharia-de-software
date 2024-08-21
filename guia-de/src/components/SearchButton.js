import React from 'react';

function SearchButton(props) {
  return (
    <button 
          className='App-button' 
          type='button'
          onClick={(e) => props.setPerformSearch(true)}>
            {props.text}
    </button>
  );
}

export default SearchButton;