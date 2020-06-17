import React, { useState } from 'react';
import { useContent } from 'fusion:content';
import { useAppContext, useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import footerFilter from '../../../../content/filters/bottom-nav';
import './default.scss';
import menuArrow from '../../../../resources/images/menu-arrow.svg';
import facebookIcon from '../../../../resources/images/facebook-icon.svg';
import twitterIcon from '../../../../resources/images/twitter-icon.svg';
import rightArrow from '../../../../resources/images/right-arrow.svg';
import getLinkURL from '../../../layouts/_helper_functions/getLinkUrl';


const Footer = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const appContext = useAppContext();
  const { deployment, contextPath } = appContext;
  let twitterURL = '';
  let facebookURL = '';

  const siteNavigation = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNav',
    },
    filter: footerFilter,
  });

  const { footerLogo } = getProperties(arcSite);

  const { children: linkCategories } = siteNavigation || {};
  const [row1 = []] = linkCategories || [];

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
    <footer className="c-footer b-clear-both">
      <div className="logo-row">
        <div className="col">
          <a href="/">
            <img className="footer-logo" src={deployment(`${contextPath}${footerLogo}`)} alt="logo" />
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
        {linkCategories
          && linkCategories.map((linkCategory, i) => {
            const parentListTitle = (linkCategory.navigation && linkCategory.navigation.nav_title) || '';
            if (linkCategory.children.length > 0 && i !== linkCategories.length - 1) {
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
                    {linkCategory.children
                      && linkCategory.children.map((link, e) => {
                        const childListTitle = (link.navigation && link.navigation.nav_title) || '';
                        const openInNewTab = link.site && link.site.section_url_open_new_tab === 'true' ? '_blank' : '';
                        return (
                          <li key={`footerChildLink-${e}`} className="menu-body-links">
                            <a href={getLinkURL(link)} target={openInNewTab}>
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
    </footer>
  );
};

export default Footer;
