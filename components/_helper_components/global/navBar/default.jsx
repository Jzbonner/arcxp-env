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
     <Section key={section._id} navigation={navigation} link={destination} childSections={childSections}/>
     <li className='itemPadding itemBottomBorder b-separatorContainer'>
       <span className='separatorBar'></span>
     </li>
     </>
      );
    }

    return (
    <>
     <Section key={section._id} navigation={navigation} link={destination} childSections={childSections}/>
     </>
    );
  });


  return (
    <div className='c-headerNav'>
        <div className='b-flexRow b-flexCenter'>
          <Logo source={siteLogoImage} rootDirectory={rootDirectory}/>
        </div>
        <nav>
          <ul className='c-navItemContainer'>
            {sectionLi}
            <li className='c-searchContainer itemBottomBorder'>
              <form className='b-formContainer'>
                <input className='b-searchInput'></input>
                <img className='b-searchIcon'
                src='https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/images/icons/search-icon.svg'></img>
              </form>
            </li>
            <li className='b-weatherIconItem c-weatherDisplay'>
              <img height='35px' src={weatherIcon}></img>
            </li>
            <li className='b-itemText b-weatherText c-weatherDisplay'>
              <a>89°</a>
            </li>
            <li className='c-loginContainer'>
              <div className='b-flexRow b-flexCenter'>
                <img src='https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/images/icons/user-icon.svg'></img>
                <div className='b-itemText b-loginText'>Log in</div>
              </div>
            </li>
          </ul>
        </nav>
        <div className='c-subBar b-flexRow b-flexCenter b-subscribeText'><span>Worth knowing. Worth Supporting.</span>
        <span className='b-subscribeBold'>Subscribe today for $1.00</span></div>
    </div>
  );
};

export default NavBar;
