import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import fetchEnv from '../../utils/environment';
import RenderMenuLinks from './_helper_functions/renderMenuLinks';
import handleSiteName from '../../../../layouts/_helper_functions/handleSiteName';
import UserIconWhite from '../../../../../resources/icons/login/UserIconWhite.jsx';
import UserIconDark from '../../../../../resources/icons/login/UserIconDark.jsx';

const isAuthMenu = ({
  isMobile, isFlyout, showUserMenu, setShowUserMenu, userStateRef, custRegId, isSidebar, darkMode, siteContent,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext, cdnSite } = getProperties(arcSite);
  const { siteCode, pubParam } = connext[currentEnv] || {};

  const source = (isFlyout || darkMode) ? <UserIconWhite /> : <UserIconDark />;

  let connextSite = cdnSite;
  if (arcSite === 'dayton') {
    connextSite = 'daytondailynews';
  } else if (arcSite === 'dayton-daily-news' || arcSite === 'springfield-news-sun') {
    connextSite = connextSite.replace(/-/g, '');
  }
  const { children: links = [] } = siteContent || [];

  const accountSubdomain = `//${currentEnv !== 'prod' ? 'test-' : ''}myaccount`;
  const isNotAuthenticated = userStateRef.current !== 'authenticated';

  const connextDomain = `${accountSubdomain}.${connextSite}.com/${siteCode ? siteCode.toLowerCase() : connextSite}`;
  const profileLink = `${connextDomain}/myprofile`;

  const renderLogoutButton = () => (
    <button
      className="btn-profile"
      data-mg2-action="logout"
      onClick={(e) => {
        e.preventDefault();
        setShowUserMenu(!showUserMenu);
      }}
    >
      Log Out
    </button>
  );

  const renderEpaperLink = () => {
    if (arcSite === 'dayton') {
      return null;
    }

    return <li className={'flyout-item'}>
      <a href={`https://epaper.${handleSiteName(arcSite)}.com/default.aspx?acc=cmg&pub=${pubParam}&date=&EntitlementCode=epaperHTML5&custregid=${custRegId}`} target="_blank" rel="noopener noreferrer">
        ePaper
      </a>
    </li>;
  };

  if (isSidebar) {
    return (
    <div onClick={() => setShowUserMenu(!showUserMenu)}>
        <UserIconDark />
        <div data-mg2-action="logout" className='login-text-bmenu'>Log Out</div>
          <div className='subNav'>
            <ul className={`subNav-flyout itemCount-${links.length + (isNotAuthenticated ? 3 : 2)} logged-out`}>
              {renderEpaperLink()}
              {RenderMenuLinks(links)}
            </ul>
          </div>
    </div>
    );
  }

  return (
    <>
      <div onClick={() => setShowUserMenu(true)}>
       {source}
        <div className='login-text'>Log Out</div>
      </div>
        <div className={`section login-menu ${!isMobile && showUserMenu ? 'isVisible' : ''}`}>
          <div className={'section-item'}>
            <a href={profileLink}>
            {source}
            </a>
            <div className="login-text">Log Out</div>
          </div>
          <div className={`subNav ${!isMobile && showUserMenu ? 'isVisible' : ''}`}>
            {renderLogoutButton()}
            <div className="login-separator"></div>
            <ul className={`subNav-flyout itemCount-${links.length + (isNotAuthenticated ? 3 : 2)} logged-out`}>
              <li className={'flyout-item'}>
                <a href={`${connextDomain}/dashboard`} target="_blank" rel="noopener noreferrer">
                  My Account
                </a>
              </li>
              {isNotAuthenticated && (
                <li className={'flyout-item MG2activation'}>
                  <a href="#" data-mg2-action="activation">
                    Link My Account
                  </a>
                </li>
              )}
              {renderEpaperLink()}
              {RenderMenuLinks(links)}
            </ul>
          </div>
        </div>
    </>
  );
};

isAuthMenu.propTypes = {
  isMobile: PropTypes.bool,
  isFlyout: PropTypes.bool,
  showUserMenu: PropTypes.bool,
  setShowUserMenu: PropTypes.func,
  userStateRef: PropTypes.object,
  custRegId: PropTypes.string,
  isSidebar: PropTypes.bool,
  darkMode: PropTypes.bool,
  siteContent: PropTypes.object,
};

export default isAuthMenu;
