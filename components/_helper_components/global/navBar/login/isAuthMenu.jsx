import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import fetchEnv from '../../utils/environment';
import handleSiteName from '../../../../layouts/_helper_functions/handleSiteName';
import openMg2Widget from './_helper_functions/openMg2Widget';
import userIconWhite from '../../../../../resources/icons/login/user-icon-white.svg';
import userIconDark from '../../../../../resources/icons/login/user-icon-dark.svg';

const isAuthMenu = ({
  isMobile,
  isFlyout,
  showUserMenu,
  setShowUserMenu,
  userStateRef,
  userId,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext, cdnSite } = getProperties(arcSite);
  const { siteCode } = connext[currentEnv] || {};

  let source;
  if (isFlyout) {
    source = userIconWhite;
  } else {
    source = userIconDark;
  }

  let connextSite = cdnSite;
  if (arcSite === 'dayton') {
    connextSite = 'daytondailynews';
  } else if (
    arcSite === 'dayton-daily-news'
    || arcSite === 'springfield-news-sun'
  ) {
    connextSite = connextSite.replace(/-/g, '');
  }

  const accountSubdomain = `//${currentEnv !== 'prod' ? 'test-' : ''}myaccount`;

  const connextDomain = `${accountSubdomain}.${connextSite}.com/${
    siteCode ? siteCode.toLowerCase() : connextSite
  }`;
  const profileLink = `${connextDomain}/myprofile`;

  const renderLogoutButton = () => <button
    className='btn-profile'
    data-mg2-action='logout'
    onClick={(e) => {
      e.preventDefault();
      setShowUserMenu(!showUserMenu);
    }}
  >
    Log Out
  </button>;

  return (
    <>
      <div onClick={() => setShowUserMenu(!showUserMenu)}>
        <img src={source} />
        <div className='nav-itemText login-text'>My Profile</div>
      </div>

      <div className={`section login-menu ${isMobile && showUserMenu ? 'isVisible' : ''}`}>
        <div className={'section-item'}>
          <a href={profileLink}>
            <img src={source} />
            <div className='nav-itemText login-text'>My Profile</div>
          </a>
        </div>
        <div className={`subNav ${isMobile && showUserMenu ? 'isVisible' : ''}`}>
          {!isMobile && renderLogoutButton()}
          <ul className={'subNav-flyout itemCount-4'}>
            {isMobile && (
              <li className={'flyout-item'}>
                {renderLogoutButton()}
              </li>
            )}
            <li className={'flyout-item'}>
              <a href={`${connextDomain}/dashboard`} target='_blank' rel="noopener noreferrer">
                My Account
              </a>
            </li>
            {userStateRef.current !== 'authenticated' && (
              <li className={'flyout-item MG2activation'}>
                <a href='#' data-mg2-action='activation'>
                  Link My Account
                </a>
              </li>
            )}
            {arcSite !== 'dayton' && <li className={'flyout-item'}>
              <a href={`https://epaper.${handleSiteName(arcSite)}.com/default.aspx?acc=cmg&pub=${siteCode}
              &date=&section=Main&EntitlementCode=epaperHTML5&custregid=${userId}`} target='_blank' rel="noopener noreferrer">
                ePaper
              </a>
            </li>}
            <li className={'flyout-item'}>
              <a href="#" onClick={() => openMg2Widget(siteCode, userStateRef.current)}>
                Newsletters
              </a>
            </li>
            <li className={'flyout-item'}>
              <a
                href={`//events.${
                  arcSite === 'dayton' ? 'dayton' : connextSite
                }.com`}
              >
                Events
              </a>
            </li>
            <li className={'flyout-item'}>
              <a href='/our-products/'>Our Products</a>
            </li>
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
  userId: PropTypes.string,
};

export default isAuthMenu;
