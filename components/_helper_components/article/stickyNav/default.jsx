import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StickyDesktopNav from './desktop/default';

const StickyNav = ({
  articleURL, headlines, comments, promoItems, contentElements,
}) => {
  const startingPoint = 200;
  const minWidth = 1023;
  const currentWidth = window.innerWidth;
  const [currentScroll, setCurrentScroll] = useState(0);
  let scroll;
  const handleScroll = (e) => {
    scroll = e.currentTarget.pageYOffset;
    setCurrentScroll(scroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [currentScroll]);

  if (currentScroll > startingPoint && currentWidth > minWidth) {
    return (
      <StickyDesktopNav
        articleURL={articleURL}
        headlines={headlines}
        comments={comments}
        promoItems={promoItems}
        contentElements={contentElements}
      />
    );
  }
  return null;
};

StickyNav.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
  promoItems: PropTypes.object,
  contentElements: PropTypes.array,
};

export default StickyNav;
