import React from 'react';
import './default.scss';
import NotFoundIcon from '../../../resources/images/NotFoundIcon';

export const FourZeroFour = () => <div className="page-not-found-feature">
  <div>
    <span className="background-image" ><NotFoundIcon /></span>
  </div>
  <div className="error-text">
    <span className="error-text-1">We can’t seem to find the page you’re looking for. </span>
    <span className="error-text-2">&nbsp;Here are some other stories that may be of interest.</span>
  </div>
</div>;

export default FourZeroFour;
