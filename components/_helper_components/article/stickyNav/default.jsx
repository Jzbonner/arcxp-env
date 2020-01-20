import React, { useState, useEffect } from 'react';
import StickyDesktopNav from './desktop/default';

const StickyNav = () => {
  const startingPoint = 300;
  const minWidth = 1023;
  const currentWidth = window.innerWidth;
  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      const scroll = e.currentTarget.pageYOffset;
      setCurrentScroll(scroll);
    });
  }, []);

  if (currentScroll > startingPoint && currentWidth > minWidth) {
    return (
        <StickyDesktopNav />
    );
  }
  return null;
};
export default StickyNav;
