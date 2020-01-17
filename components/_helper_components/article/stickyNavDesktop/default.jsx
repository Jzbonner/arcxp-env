import React, { useState, useEffect } from 'react';
import './default.scss';

const StickyDesktopNav = () => {
  const startingPoint = 300;
  const minWidth = 1023;
  const currentWidth = window.innerWidth;
  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      const scroll = e.currentTarget.pageYOffset;
      setCurrentScroll(scroll);
    //   console.log(scroll);
    });
  }, []);

  if (currentScroll > startingPoint && currentWidth > minWidth) {
    return (
      <div className="c-stickyNav stickyNav-desktop">
        <h2>STICKY NAV</h2>
      </div>
    );
  }
  return null;
};
export default StickyDesktopNav;
