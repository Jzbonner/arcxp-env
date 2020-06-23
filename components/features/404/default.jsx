import React from 'react';
import './default.scss';

export const FourZeroFour = () => {
  return (
    <div className="page-not-found-feature">
      <div className="page-not-found-background-image">
        404
      </div>
      <div className="page-not-found-text">
        {`Sorry, we couldn't find that page.
    Try Searching or go to our`} <a href="https://www.ajc.com">Frontpage.</a>
      </div>
    </div>
  );
};

export default FourZeroFour;
