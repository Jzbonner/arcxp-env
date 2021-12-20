import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import facebookLogo from '../../../../../resources/images/facebook-burger.svg';
import twitterLogo from '../../../../../resources/images/twitter-burger.svg';
import Copyright from '../../copyright/default';
import '../../../../../src/styles/container/_c-headerNav.scss';

const NavCopyright = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    domainFacebookURL, domainTwitterURL,
  } = getProperties(arcSite);

  return (
    <div className="nav-copyright">
        <div className="nav-social">
          <a href={domainFacebookURL} className="burger-fb" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt='facebook logo' />
          </a>
          <a href={domainTwitterURL} className="burger-twitter" target="_blank" rel="noopener noreferrer">
            <img src={twitterLogo} alt='twitter logo' />
          </a>
        </div>
      <Copyright isSidebar/>
    </div>
  );
};

export default NavCopyright;
