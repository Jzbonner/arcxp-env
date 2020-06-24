import React from 'react';
import './default.scss';
import keyboardImage from '../../../resources/images/keyboard-404.png';

export const FourZeroFour = () => {
  return (
    <div className="page-not-found-feature">
      <div className="background-image-text b-margin-bottom-d40-m20">
        <img className="background-image" src={keyboardImage} />
        <h1 className="number-text">404</h1>
      </div>
      <div className="text">
        {'Sorry, we couldn\'t find that page.'}
      </div>
      <div className="text">
        Try Searching or go to our <a href="https://www.ajc.com">Frontpage.</a>
      </div>
    </div>
  );
};

export default FourZeroFour;
