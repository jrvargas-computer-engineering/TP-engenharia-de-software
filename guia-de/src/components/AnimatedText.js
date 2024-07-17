import React, { useState, useEffect } from 'react';

export const AnimatedText = ({ list, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnimation, setAnimation] = useState(false);

  useEffect(() => {
    if(showAnimation){
      const timeout = setTimeout(() => {
        setCurrentText("");
        setAnimation(false);
      }, delay);
      return () => clearTimeout(timeout);
    }else{
      if (currentIndex === list.length) setCurrentIndex(0);
      if (currentIndex < list.length) {
        const timeout = setTimeout(() => {
          setAnimation(true);
          setCurrentText(list[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
      }, 1);
      
      return () => clearTimeout(timeout);
      }

    }
  }, [currentIndex, showAnimation, delay, list]);

  return <span className={showAnimation?'App-anim-span':""}>{currentText}</span>;
};
