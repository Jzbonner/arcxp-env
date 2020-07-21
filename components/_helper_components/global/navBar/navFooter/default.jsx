import React from 'react';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import copyrightFilter from '../../../../../content/filters/copyright';
import facebookLogo from '../../../../../resources/images/facebook-logo.png';
import twitterLogo from '../../../../../resources/images/twitter-logo.png';
import './default.scss';

const NavFooter = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    domainFacebookURL, domainTwitterURL, siteName,
  } = getProperties(arcSite);

  const siteContent = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'MobileFlyoutFooter',
    },
    filter: copyrightFilter,
  });

  const { children } = siteContent || {};

  const checkSiteName = () => {
    if (siteName.toLowerCase() === 'ajc') {
      return 'The Atlanta Journal-Constitution';
    }
    if (siteName.toLowerCase() === 'dayton-daily-news') {
      return 'Dayton Daily News';
    }
    if (siteName.toLowerCase() === 'dayton') {
      return 'Dayton.com';
    }
    if (siteName.toLowerCase() === 'journal-news') {
      return 'Journal-News';
    }
    if (siteName.toLowerCase() === 'springfield-news-sun') {
      return 'Springfield News-Sun';
    }
    return null;
  };
  return (
    <li className="nav-mobile-footer">
      <div className="b-flexCenter b-flexRow">
        <div className="nav-social">
          <a href={domainFacebookURL} target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} />
          </a>
          <a href={domainTwitterURL} target="_blank" rel="noopener noreferrer">
            <img src={twitterLogo} />
          </a>
        </div>
      </div>
      <div className="nav-copyright b-flexRow b-flexCenter">
        <span style={{ paddingRight: 5 }}>&copy; {new Date().getFullYear()}</span>
        <a href="/">{checkSiteName()}</a>
      </div>
      <div className="b-flexRow b-flexCenter nav-copyright-links">
        {children && children.map((child, i) => {
          const title = child && child.navigation && child.navigation.nav_title;
          const url = child && child.site && child.site.site_url;
          const id = child && child._id;
          const filterURL = url || id;
          return <a href={filterURL} key={i}>{title}</a>;
        })}
      </div>
    </li>
  );
};

export default NavFooter;
