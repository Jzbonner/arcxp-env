import React from 'react';
import './default.scss';
import keyboardImage from '../../../resources/images/404.png';

export const FourZeroFour = () => <div className="page-not-found-feature">
  <div className="background-image-text b-margin-bottom-d40-m20">
    <img className="background-image" src={keyboardImage} />
  </div>
  <div className="text">Sorry, we couldn&apos;t find that page.</div>
  <div className="text">Try Searching or go to our <a href='/'>Frontpage.</a></div>
</div>;

export default FourZeroFour;
