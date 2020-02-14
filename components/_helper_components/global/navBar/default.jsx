import React from 'react';
import { useContent } from 'fusion:content';
import topNavFilter from '../../../../content/filters/top-nav';
import Section from './section/default';
import Logo from './logo/default';
import weatherIcon from '../../../../resources/images/cloudy.png';
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


  return (
    <div className='c-headerNav'>
        <div className='b-flexRow b-flexCenter'>
          <Logo source={siteLogoImage} rootDirectory={rootDirectory}/>
        </div>
        <nav>
          <ul className='nav-row'>
            {sectionLi}
            <li className='nav-search nav-itemBottomBorder'>
              <form className='search-form'>
                <input className='search-input'></input>
                <img className='search-icon'
                src='https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/images/icons/search-icon.svg'></img>
              </form>
            </li>
            <li className='nav-weather weather-icon'>
              <img height='35px' src={weatherIcon}></img>
            </li>
            <li className='nav-itemText nav-weather weather-text'>
              <a>89°</a>
            </li>
            <li className='nav-login'>
              <div className='b-flexRow b-flexCenter'>
                <img src='https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/images/icons/user-icon.svg'></img>
                <div className='nav-itemText login-text'>Log in</div>
              </div>
            </li>
          </ul>
        </nav>
        <div className='sub b-flexRow b-flexCenter sub-text'><span>Worth knowing. Worth Supporting.</span>
        <span className='sub-bold'>Subscribe today for $1.00</span></div>
    </div>
  );
};

export default NavBar;
