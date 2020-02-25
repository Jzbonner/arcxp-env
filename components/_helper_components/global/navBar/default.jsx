import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import topNavFilter from '../../../../content/filters/top-nav';
import Section from './section/default';
import Logo from './logo/default';
import Subscribe from './subscribe/default';
import DesktopNav from './desktopNav/default';
import StickyNav from './stickyNav/default';
import '../../../../src/styles/base/_utility.scss';
import './default.scss';
import './stickyNav/default.scss';

const NavBar = ({
  articleURL, headlines, comments, promoItems, contentElements,
}) => {
  let scroll;
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const startingPoint = 200;
  const desktopWidth = 1023;
  const [currentWidth, setWidth] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  // const stickyActive = isSticky ? 'c-stickyNav-active' : '';
  const handleScroll = (e) => {
    scroll = e.currentTarget.pageYOffset;
    setCurrentScroll(scroll);
    // setSticky(ref.current.getBoundingClientRect().bottom <= 0);
  };

  // useEffect(() => {
  //   setWidth(window.innerWidth);
  // }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  useEffect(() => {
    if (currentScroll > startingPoint) {
      setSticky(true);
    }
    if (isSticky === true && currentScroll < startingPoint) {
      setSticky(false);
    }
  }, [currentScroll]);

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

  if (currentWidth > desktopWidth && !isSticky) {
    return (
      <>
        <div className='c-headerNav' ref={ref}>
          <div className='c-logo b-flexRow b-flexCenter'>
            <Logo source={siteLogoImage} rootDirectory={rootDirectory}/>
          </div>
            <DesktopNav sections={sectionLi}/>
            <div className='sub b-flexRow b-flexCenter sub-text'>
              <Subscribe/>
            </div>
        </div>
      </>
    );
  }

  if (currentWidth <= desktopWidth && !isSticky) {
    return (
        <div className='c-headerNav'>
          <div className='b-flexRow b-flexCenter'>
            <Logo source={siteLogoImage} rootDirectory={rootDirectory}/>
          </div>
          <div className='sub b-flexRow b-flexCenter sub-text'>
            <Subscribe/>
          </div>
        </div>
    );
  }

  if (isSticky) {
    return (
      <div className='c-stickyNav' ref={ref}>
        <StickyNav
        articleURL={articleURL}
        headlines={headlines}
        comments={comments}
        promoItems={promoItems}
        contentElements={contentElements}
        visible={isSticky}
        resolution={currentWidth}
        />
      </div>
    );
  }

  return null;
};

NavBar.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
  promoItems: PropTypes.object,
  contentElements: PropTypes.array,
};

export default NavBar;
