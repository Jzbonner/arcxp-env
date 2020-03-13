import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../default.scss';
import '../../../../../src/styles/base/_utility.scss';

const Section = ({
  navigation,
  link,
  childSections,
  index,
  setSection,
  activeSection,
  newTab,
}) => {
  const {
    nav_title: name,
  } = navigation;
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setSection(index);
  }
  const subNavRef = React.createRef(null);
  const [width, setWidth] = useState(null);
  // width = subNavRef.current.offsetWidth;


  // console.log(subNavRef);
  // if (subNavRef.current) {
  //   console.log(subNavRef.current);
  //   console.log(subNavRef.current.offsetWidth);
  // } else {
  //   console.log("NO BUENOOOOO")
  // }
  useEffect(() => {
    if (subNavRef.current) {
      setWidth(subNavRef.current.offsetWidth);
    }
  }, [subNavRef.current]);

  console.log(width);

  const isActive = index === activeSection ? 'isVisible' : '';

  let ePaperClass = '';
  if (name === 'ePaper') {
    ePaperClass = 'nav-ePaper';
  }
  // Added protection if there are no subsections
  if (childSections.length === 0) {
    return <>
      <li className={`nav-items nav-itemBottomBorder nav-itemText ${ePaperClass}`}>
            <a href={link} target={newTab === 'true' ? '_blank' : '_self'}>{name}</a>
      </li>
        </>;
  }
  const childList = childSections.map((childSection) => {
    const {
      _id: id,
      navigation: childNav,
      site,
    } = childSection || {};

    const {
      nav_title: childName,
    } = childNav || {};
    const {
      site_url: childURL,
    } = site || {};

    if (childName) {
      return (
        <li key={id} className='flyout-item'>
          <a href={childURL}>{childName}</a>
        </li>
      );
    }
    return null;
  });

  return (
    <>
      <li className={`nav-items nav-itemBottomBorder nav-itemText ${ePaperClass}`}
       onMouseEnter={ e => handleClick(e)} onClick={ e => handleClick(e)}>
        <div className='nav-item-link'>
          <a>{name}</a>
          <div className={`nav-item-circle b-flexCenter ${isActive}`}></div>
        </div>
        <div className={`section ${isActive}`}>
          <div className='menu-item'>
            <a>{name}</a>
          </div>
          <div className={`subNav ${isActive}`} style={{ width: `${width}px` }} ref={subNavRef}>
            <ul className={`subNav-flyout itemCount-${childSections.length}`}>
              {childList}
            </ul>
          </div>
        </div>
      </li>
    </>
  );
};

Section.propTypes = {
  navigation: PropTypes.object,
  link: PropTypes.string,
  childSections: PropTypes.array,
  index: PropTypes.number,
  setSection: PropTypes.func,
  activeSection: PropTypes.number,
  newTab: PropTypes.string,
};

export default Section;
