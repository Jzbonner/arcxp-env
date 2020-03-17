import React from 'react';
import { useContent } from 'fusion:content';
import topNavFilter from '../../../../content/filters/top-nav';
import Section from './section/default';
import Logo from './logo/default';
import Subscribe from './subscribe/default';
import DesktopNav from './desktopNav/default';
import '../../../../src/styles/base/_utility.scss';
import './default.scss';

const NavBar = () => {
  const sections = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'TopNav',
    },
    filter: topNavFilter,
  });
  const {
    site: siteLogoImage,
    children,
    _id: rootDirectory,
  } = sections || {};

  if (!children) {
    return null;
  }

  const verticalBarIndex = children.length - 2;

  const sectionLi = children.map((section) => {
    const {
      _id: id,
      children: childSections,
      site,
      navigation,
    } = section || {};
    const {
      site_url: siteURL,
      section_url_open_new_tab: newTab,
    } = site || {};

    const destination = id.includes('/configsection') ? siteURL : id;
    if (children[verticalBarIndex] === section) {
      return (
        <React.Fragment key={id}>
          <Section navigation={navigation} link={destination} childSections={childSections} newTab={newTab}/>
          <li className='nav-items nav-itemBottomBorder nav-separator'>
            <span className='separatorBar'></span>
          </li>
        </React.Fragment>
      );
    }

    return (
     <Section key={id} navigation={navigation} link={destination} childSections={childSections} newTab={newTab}/>
    );
  });


  return (
    <div className='c-headerNav'>
      <div className='b-flexRow b-flexCenter'>
        <Logo source={siteLogoImage} rootDirectory={rootDirectory}/>
      </div>
        <DesktopNav sections={sectionLi}/>
        <div className='sub b-flexRow b-flexCenter sub-text'>
          <Subscribe/>
        </div>
    </div>
  );
};

export default NavBar;
