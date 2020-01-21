import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StickyDesktopNav from './desktop/default';

const StickyNav = ({ articleURL, headlines }) => {
  const startingPoint = 200;
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
    return <StickyDesktopNav articleURL={articleURL} headlines={headlines} />;
  }
  return null;
};

StickyNav.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
};

export default StickyNav;
