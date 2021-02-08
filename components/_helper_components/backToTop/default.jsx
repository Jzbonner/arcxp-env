import React from 'react';
import TopArrow from '../../../resources/icons/global/TopArrow.svg';
import './default.scss';

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='c-backToTop' onClick={scrollToTop}>
      <span>Back to Top</span>
{/*       <div className='arrow'>
        <i className='shape'></i>
      </div> */}
      <img src={TopArrow}>
      </img>
    </div>
  );
};

export default BackToTop;
