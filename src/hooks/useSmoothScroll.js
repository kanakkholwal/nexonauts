import React, { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault();

      const targetId = event.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    const anchorTags = document.querySelectorAll('a[href^="#"]');
    anchorTags.forEach((anchor) => {
      anchor.addEventListener('click', handleClick);
    });

    return () => {
      anchorTags.forEach((anchor) => {
        anchor.removeEventListener('click', handleClick);
      });
    };
  }, []);
};

export default useSmoothScroll;
