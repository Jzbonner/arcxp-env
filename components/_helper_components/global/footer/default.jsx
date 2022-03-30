import React, { useState } from 'react';
import { useContent } from 'fusion:content';
import { useAppContext, useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import footerFilter from '../../../../content/filters/bottom-nav';
import getLinkURL from '../../../layouts/_helper_functions/getLinkUrl';
import getDomain from '../../../layouts/_helper_functions/getDomain';
import ConnextBottomNavSubPromo from '../ConnextBottomNavSubPromo/default';
import Copyright from '../copyright/default';
import LogoFullRedesign from '../../../../resources/logos/AJC/logo-full-redesign';
import '../../../../src/styles/container/_c-footer.scss';


const Footer = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const appContext = useAppContext();
  const { deployment, contextPath, layout } = appContext;

  const siteNavigation = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNavRedesign2021',
    },
    filter: footerFilter,
  });

  const {
    logoRedesign, siteName, cdnSite, cdnOrg,
  } = getProperties(arcSite);

  const { children: linkCategories } = siteNavigation || {};

  const [openMenu, setOpenMenu] = useState('');

  const handleClick = (menu) => {
    if (openMenu === menu) {
      setOpenMenu('');
    } else {
      setOpenMenu(menu);
    }
  };

  return (
    <div className="footer-wrapper b-sectionHomeMaxWidth">
      <footer className="c-footer b-clear-both">
        <div className="logo-row">
          <div className="col">
            <a href="/">
              {
                siteName === 'ajc' ? <div className='footer-logo ajc'><LogoFullRedesign /></div>
                  : <img
                className={`footer-logo ${siteName.toLowerCase()}`}
                src={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${logoRedesign}`)}`} alt="logo"
              />
              }
            </a>
          </div>
          <ConnextBottomNavSubPromo />
          <Copyright cssClass={'in-footer'} hideBackToTop={true} />
        </div>
        <ul className="menu-row">
          {linkCategories
            && linkCategories.map((linkCategory, i) => {
              const parentListTitle = (linkCategory.navigation && linkCategory.navigation.nav_title) || '';
              if (linkCategory.children.length > 0 && parentListTitle !== 'Follow') {
                return (
                  <li
                    key={`footerParentLink-${i}`}
                    className={`menu ${openMenu === parentListTitle ? 'is-visible-mobile' : ''}`}
                    onClick={() => handleClick(parentListTitle)}
                  >
                    <div className="menu-header">
                      {parentListTitle}
                    </div>

                    <ul className="menu-body">
                      {linkCategory.children
                        && linkCategory.children.map((link, e) => {
                          const childListTitle = (link.navigation && link.navigation.nav_title) || '';
                          const openInNewTab = link.site && link.site.section_url_open_new_tab === 'true' ? '_blank' : '_self';
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
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
