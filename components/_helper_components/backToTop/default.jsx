import React from 'react';
import './default.scss';

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='c-backToTop' onClick={scrollToTop}>
      <span>Back to Top</span>
      <span className="top-arrow-icon"></span>
    </div>
  );
};

export default BackToTop;
