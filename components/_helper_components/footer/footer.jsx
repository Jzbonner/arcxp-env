import React, { useState } from 'react';
import { useContent } from 'fusion:content';
import './default.scss';
import menuArrow from '../../../resources/images/menu-arrow.svg';
import ajcLogo from '../../../resources/images/ajc-logo.svg';

const Footer = () => {
  const siteContent = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNav',
    },
  });

  const { children } = siteContent || {};
  const [row1 = [], row2_col1 = [], row2_col2 = [], row2_col3 = [], row2_col4 = []] = children || [];

  const [openMenu, setOpenMenu] = useState('');

  const getURL = (link) => {
    if (link._id.includes('configsection') && link.site.site_url) {
      // not sure about best default behavior if no site url is set for a configsection
      return link.site.site_url;
    }
    return link._id;
  };

  return (
    <footer className="c-footer">
      <div className="row footer-row-1">
        <div className="col">
          <img className="logo" src={ajcLogo} alt="logo" />
        </div>
        <div className="col newsletter-signup">{row1.navigation.nav_title}</div>
      </div>
      <div className="row footer-row-2">
        <ul>
          <li className={'col-header'} onClick={() => setOpenMenu(row2_col1.name)}>
            <span className="header-text">{row2_col1.name}</span>
            <img className="menu-arrow" src={menuArrow} alt="" />
            <ul>
              {row2_col1.children
                && row2_col1.children.map((val, i) => (
                  <li key={i} className="col-links">
                    <a href={getURL(val)}>{val.name}</a>
                  </li>
                ))}
            </ul>
          </li>

          <li className={'col-header'} onClick={() => setOpenMenu(row2_col2.name)}>
            <span className="header-text">{row2_col2.name}</span>
            <img className="menu-arrow" src={menuArrow} alt="" />
            <ul>
              {row2_col2.children
                && row2_col2.children.map((val, i) => (
                  <li key={i} className="col-links">
                    <a href={getURL(val)}>{val.name}</a>
                  </li>
                ))}
            </ul>
          </li>

          <li className={`col-header ${openMenu === row2_col3.name ? 'is-visible' : ''}`} onClick={() => setOpenMenu(row2_col3.name)}>
            <span className="header-text">{row2_col3.name}</span>
            <img className="menu-arrow" src={menuArrow} alt="" />
            <ul>
              {row2_col3.children
                && row2_col3.children.map((val, i) => (
                  <li key={i} className="col-links">
                    <a href={getURL(val)}>{val.name}</a>
                  </li>
                ))}
            </ul>
          </li>

          <li className={`col-header ${openMenu === row2_col4.name ? 'is-visible' : ''}`} onClick={() => setOpenMenu(row2_col4.name)}>
            <span className="header-text">{row2_col4.name}</span>
            <img className="menu-arrow" src={menuArrow} alt="" />
            <ul>
              {row2_col4.children
                && row2_col4.children.map((val, i) => (
                  <li key={i} className="col-links">
                    <a href={getURL(val)}>{val.name}</a>
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
