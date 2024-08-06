// src/pages/Guide.js
import React from 'react';
import  Opinion from '../../components/Opinion/Opinion';

export function Guide() {
  return (
    <div>
      <Opinion 
        title="Título 1" 
        subtitle="Subtítulo 1" 
        text="Este é o texto do primeiro cartão."
      />
      <Opinion 
        title="Título 2" 
        subtitle="Subtítulo 2" 
        text="Este é o texto do segundo cartão."
      />
    </div>
  );
}

export default Guide;