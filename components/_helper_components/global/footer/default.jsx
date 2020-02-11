import React, { useState } from 'react';
import { useContent } from 'fusion:content';
import './default.scss';
import menuArrow from '../../../../resources/images/menu-arrow.svg';
import ajcLogo from '../../../../resources/images/ajc-logo.svg';
import facebookIcon from '../../../../resources/images/facebook-icon.svg';
import twitterIcon from '../../../../resources/images/twitter-icon.svg';
import roundButton from '../../../../resources/images/round-button.svg';
import getLinkURL from '../../../layouts/_helper_functions/getLinkUrl';
import Copyright from '../copyright/default';

const Footer = () => {
  const siteContent = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNav',
    },
  });

  const { children } = siteContent || {};
  const [row1 = []] = children || [];

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
      <div className="logo-row">
        <div className="col">
          <a href="https://www.ajc.com/"><img className="logo" src={ajcLogo} alt="logo" /></a>
        </div>
        <div className="col">
          <a href="https://myaccount.ajc.com/ajc/preference" className="newsletter-signup">
            <p>{row1.navigation && row1.navigation.nav_title}</p>
            <img src={roundButton} alt="" />
          </a>
        </div>
      </div>
      <ul className="menu-row">
        {children
          && children.map((parent, i) => {
            if (parent.children.length > 0) {
              return (
                <li
                  key={`footerParentLink-${i}`}
                  className={`menu ${openMenu === parent.name ? 'is-visible-mobile' : ''}`}
                  onClick={() => handleClick(parent.name)}
                >
                  <div className="menu-header">
                    {parent.name}
                    <img className="menu-arrow" src={menuArrow} alt="" />
                  </div>

                  <ul className="menu-body">
                    {parent.children
                      && parent.children.map((child, e) => (
                        <li key={`footerChildLink-${e}`} className="menu-body-links">
                          <a href={getLinkURL(child)}>{child.name}</a>
                        </li>
                      ))}
                  </ul>
                </li>
              );
            }
            return null;
          })}
        <li className="menu social-media">
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
      <Copyright />
    </footer>
  );
};


export default Footer;
