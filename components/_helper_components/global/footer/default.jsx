import React, { useState } from 'react';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import './default.scss';
import menuArrow from '../../../../resources/images/menu-arrow.svg';
import facebookIcon from '../../../../resources/images/facebook-icon.svg';
import twitterIcon from '../../../../resources/images/twitter-icon.svg';
import rightArrow from '../../../../resources/images/right-arrow.svg';
import getLinkURL from '../../../layouts/_helper_functions/getLinkUrl';
import Copyright from '../copyright/default';

const Footer = () => {
  const appContext = useAppContext();
  const { deployment, contextPath } = appContext;
  let twitterURL = '';
  let facebookURL = '';

  const siteNavigation = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNav',
    },
  });

  const { logo, homeURL } = getProperties();

  const { children } = siteNavigation || {};
  const [row1 = []] = children || [];

  const [openMenu, setOpenMenu] = useState('');

  const handleClick = (menu) => {
    if (openMenu === menu) {
      setOpenMenu('');
    } else {
      setOpenMenu(menu);
    }
  };

  if (siteNavigation && siteNavigation.children[5]) {
    if (siteNavigation.children[5].children[0] && siteNavigation.children[5].children[0].url) {
      twitterURL = siteNavigation.children[5].children[0].url;
    }
    if (siteNavigation.children[5].children[1] && siteNavigation.children[5].children[1].url) {
      facebookURL = siteNavigation.children[5].children[1].url;
    }
  }

  return (
    <footer className="c-footer">
      <div className="logo-row">
        <div className="col">
          <a href={homeURL}>
            <img className="logo" src={deployment(`${contextPath}${logo}`)} alt="logo" />
          </a>
        </div>
        <div className="col">
          <a href={getLinkURL(row1)} className="newsletter-signup">
            <p>{row1.navigation && row1.navigation.nav_title}</p>
            <img src={rightArrow} alt="" />
          </a>
        </div>
      </div>
      <ul className="menu-row">
        {children
          && children.map((parent, i) => {
            const parentListTitle = (parent.navigation && parent.navigation.nav_title) || '';
            if (parent.children.length > 0 && parent.navigation.nav_title !== 'Follow') {
              return (
                <li
                  key={`footerParentLink-${i}`}
                  className={`menu ${openMenu === parentListTitle ? 'is-visible-mobile' : ''}`}
                  onClick={() => handleClick(parentListTitle)}
                >
                  <div className="menu-header">
                    {parentListTitle}
                    <img className="menu-arrow" src={menuArrow} alt="" />
                  </div>

                  <ul className="menu-body">
                    {parent.children
                      && parent.children.map((child, e) => {
                        const childListTitle = (child.navigation && child.navigation.nav_title) || '';
                        const openInNewTab = child.site && child.site.section_url_open_new_tab === 'true' ? '_blank' : '';
                        return (
                          <li key={`footerChildLink-${e}`} className="menu-body-links">
                            <a href={getLinkURL(child)} target={openInNewTab}>
                              {childListTitle}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              );
            }
            return null;
          })}
        <li className="menu social-media">
          <span className="header-menu">Follow</span>
          <ul className="social-media-icons">
            <li>
              <a href={facebookURL}>
                <img src={facebookIcon} alt="" />
              </a>
            </li>
            <li>
              <a href={twitterURL}>
                <img src={twitterIcon} alt="" />
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <Copyright />
    </footer>
  );
};

export default Footer;
