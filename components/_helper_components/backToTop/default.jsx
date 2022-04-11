import React from 'react';
import './default.scss';
// import TopArrow from '../../../resources/icons/global/TopArrow.svg';

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='c-backToTop'>
      <span>Back to Top</span>
      <span className="top-arrow-icon" onClick={scrollToTop}></span>
    </div>
  );
};

export default BackToTop;
