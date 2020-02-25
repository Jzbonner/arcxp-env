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
import '../../../../src/styles/container/_article-basic.scss';
import './default.scss';
import './stickyNav/default.scss';

const NavBar = ({
  articleURL, headlines, comments,
}) => {
  let scroll;
  const [isSticky, setSticky] = useState(false);
  const [stickyHeight, setHeight] = useState(0);
  const [currentWidth, setWidth] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const desktopWidth = 1023;
  const handleScroll = (e) => {
    scroll = e.currentTarget.pageYOffset;
    setCurrentScroll(scroll);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (topRef.current && currentScroll > stickyHeight) {
      setSticky(true);
      setCurrentScroll(currentScroll + 10);
    }
    // if (isSticky === true && currentScroll <= bottomRef.current.getBoundingClientRect().top) {
    //   setSticky(false);
    // }
  }, [currentScroll]);

  useEffect(() => {
    if (topRef && topRef.current) {
      setHeight(topRef.current.getBoundingClientRect().bottom);
    }
  }, [topRef.current]);

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
      <header className="c-nav">
        <div className='c-headerNav'>
          <div className='c-logo b-flexRow b-flexCenter'>
            <Logo source={siteLogoImage} rootDirectory={rootDirectory} topRef={topRef}/>
          </div>
          <DesktopNav sections={sectionLi}/>
          <div className='sub b-flexRow b-flexCenter sub-text'>
            <Subscribe/>
          </div>
        </div>
      </header>
    );
  }

  if (currentWidth <= desktopWidth && !isSticky) {
    return (
      <header className="c-nav">
        <div className='c-headerNav'>
          <div className='b-flexRow b-flexCenter'>
            <Logo source={siteLogoImage} rootDirectory={rootDirectory}/>
          </div>
          <div className='sub b-flexRow b-flexCenter sub-text'>
            <Subscribe/>
          </div>
        </div>
      </header>
    );
  }

  return (
  <div className='c-stickyNav' ref={bottomRef}>
    <StickyNav
    articleURL={articleURL}
    headlines={headlines}
    comments={comments}
    visible={isSticky}
    resolution={currentWidth}
    />
  </div>
  );
};

NavBar.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
};

export default NavBar;
