import React, { useState } from 'react';
import { useContent } from 'fusion:content';
import './default.scss';
import menuArrow from '../../../resources/images/menu-arrow.svg';
import ajcLogo from '../../../resources/images/ajc-logo.svg';
import facebookIcon from '../../../resources/images/facebook-icon.svg';
import twitterIcon from '../../../resources/images/twitter-icon.svg';
import roundButton from '../../../resources/images/round-button.svg';

const Footer = () => {
  const siteContent = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNav',
    },
  });

  const { children } = siteContent || {};
  const [row1 = []] = children || [];

  const getURL = (link) => {
    if (link._id.includes('configsection') && link.site.site_url) {
      // not sure about best default behavior if no site url is set for a configsection
      return link.site.site_url;
    }
    return link._id;
  };

  const [openMenu, setOpenMenu] = useState('');

  const handleClick = (menu) => {
    if (openMenu === menu) {
      setOpenMenu('');
    } else {
      setOpenMenu(menu);
    }
  };

  return (
    <footer className="c-footer">
      <div className="footer-row-1">
        <div className="col">
          <img className="logo" src={ajcLogo} alt="logo" />
        </div>
        <a href="#" className="col newsletter-signup">
          {row1.navigation.nav_title}
          <img src={roundButton} alt="" />
        </a>
      </div>
      <div className="footer-row-2">
        <ul className="menus">
          {children.map((parent, i) => {
            if (parent.children.length > 0) {
              return (
                <li
                  key={`footerParentLink-${i}`}
                  className={`col-header ${openMenu === parent.name ? 'is-visible-mobile' : ''}`}
                  onClick={() => handleClick(parent.name)}
                >
                  <div className="header-text">
                    {parent.name}
                    <img className="menu-arrow" src={menuArrow} alt="" />
                  </div>

                  <ul className="childlist">
                    {parent.children
                      && parent.children.map((child, e) => (
                        <li key={`footerChildLink-${e}`} className="col-links">
                          <a href={getURL(child)}>{child.name}</a>
                        </li>
                      ))}
                  </ul>
                </li>
              );
            }
            return null;
          })}
          <li className="col-header social-media">
            <span className="header-text">Follow</span>
            <ul className="social-media-icons">
              <li>
                <a href="https://www.facebook.com/ajc">
                  <img src={facebookIcon} alt="" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ajc">
                  <img src={twitterIcon} alt="" />
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
