import React from 'react';
import './default.scss';
import { useFusionContext } from 'fusion:context';
import keyboardImage from '../../../resources/images/404.png';

export const FourZeroFour = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  return (<div className="page-not-found-feature">
    <div className="background-image-text b-margin-bottom-d40-m20">
      <img className="background-image" src={keyboardImage} />
    </div>
    <div className="text">
      {'Sorry, we couldn\'t find that page.'}
    </div>
    <div className="text">
      Try Searching or go to our <a href={`https://www.${arcSite}.com`}>Frontpage.</a>
    </div>
  </div>);
};

export default FourZeroFour;
