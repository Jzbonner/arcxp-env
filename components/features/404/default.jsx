import React from 'react';
import './default.scss';
import keyboardImage from '../../../resources/images/404_latest.svg';

export const FourZeroFour = () => <div className="page-not-found-feature">
  <div>
    <img className="background-image" src={keyboardImage} />
  </div>
  <div className="error-text">
    <span className="error-text-1">We can’t seem to find the page you’re looking for. </span>
    <span className="error-text-2"> Here are some other stories that may be of interest.</span>
  </div>
</div>;

export default FourZeroFour;
