import React, { useState, topRef } from 'react';
import { useContent } from 'fusion:content';
import topNavFilter from '../../../../content/filters/top-nav';
import Section from './section/default';
import Logo from './logo/default';
import Subscribe from './subscribe/default';
import DesktopNav from './desktopNav/default';
import Login from './login/default';
import '../../../../src/styles/base/_utility.scss';
import '../../../../src/styles/container/_article-basic.scss';
import './default.scss';

const NavBar = () => {
  const [mobileMenuToggled, setToggle] = useState(false);
  const mobileMenu = mobileMenuToggled ? 'mobile-nav-activated' : '';
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
    } = site || {};

    const destination = id.includes('/configsection') ? siteURL : id;
    if (children[verticalBarIndex] === section) {
      return (
      <>
     <Section keyName={id} navigation={navigation} link={destination} childSections={childSections}/>
     <li className='nav-items nav-itemBottomBorder nav-separator'>
       <span className='separatorBar'></span>
     </li>
     </>
      );
    }

    return (
    <>
     <Section keyName={id} navigation={navigation} link={destination} childSections={childSections}/>
     </>
    );
  });

  // if (currentWidth > desktopWidth) {
  return (
      <header className="c-nav">
        <div className='c-headerNav'>
          <div className='b-flexRow b-flexCenter nav-logo'>
            <div className='nav-menu-toggle' onClick={() => { setToggle(true); }}>
              <div className='nav-flyout-button'>
              </div>
            </div>
            <div className='nav-mobile-logo'>
              <Logo source={siteLogoImage} rootDirectory={rootDirectory} topRef={topRef}/>
            </div>
            <Login/>
          </div>
          <DesktopNav sections={sectionLi} mobile={mobileMenu} setToggle={setToggle}/>
          <div className='sub b-flexRow b-flexCenter sub-text'>
            <Subscribe/>
          </div>
        </div>
      </header>
  );
  // }

  // if (currentWidth <= desktopWidth) {
  //   return (
  //     <header className="c-nav">
  //       <div className='c-headerNav'>
  //         <div className='b-flexRow b-flexCenter nav-logo'>
  //           <div className='nav-menu-toggle'>
  //             <div className='nav-flyout-button'>
  //             </div>
  //           </div>
  //           <Logo source={siteLogoImage} rootDirectory={rootDirectory}/>
  //           <Login/>
  //         </div>
  //         <div className='sub b-flexCenter b-flexRow sub-text'>
  //           <Subscribe/>
  //         </div>
  //       </div>
  //     </header>
  //   );
  // }
  // return null;
};

export default NavBar;
