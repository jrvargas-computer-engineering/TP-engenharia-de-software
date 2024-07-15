import React, { useState, useEffect } from 'react';

export const AnimatedText = ({ list, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex === list.length) setCurrentIndex(0);
    if (currentIndex < list.length) {
      const timeout = setTimeout(() => {
        setCurrentText(list[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, list]);

  return <span>{currentText}</span>;
};
