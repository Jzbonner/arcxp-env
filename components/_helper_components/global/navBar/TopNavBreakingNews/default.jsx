import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../default';
import BreakingNews from '../../breakingNews/default';
import ArcAd from '../../../../features/ads/default';
import WeatherAlerts from '../../weatherAlerts/default';
import { debounce } from '../../../../features/gallery/_helper_functions';
import './default.scss';

const HS01 = () => <ArcAd staticSlot={'HS01'} />;

const TopNavBreakingNews = ({
  articleURL,
  headlines,
  comments,
  type,
  /* subtype, */
  ampPage = false,
  noAds = false,
  omitBreakingNews = false,
}) => {
  const [aboveWindowShade, setAboveWindowShade] = useState(false);
  const [onMainContent, setOnMainContent] = useState(false);
  const [ignoreEmptyConnextBar, setIgnoreEmptyConnextBar] = useState(false);

  const windowExists = typeof window !== 'undefined';

  const docHasWindowShade = (checkCollapse) => {
    if (windowExists) {
      const docBody = document.querySelector('body');

      if (checkCollapse) {
        return docBody.classList.contains('window-shade-collapsed');
      }

      return docBody.classList.contains('window-shade');
    }
    return null;
  };

  const handleScroll = debounce(() => {
    const navRef = document.querySelector('.c-headerNav.stickyActive');
    const navBottom = navRef && navRef.getBoundingClientRect().bottom;
    const pageContentRef = document.querySelector('main');
    const contentTop = pageContentRef && pageContentRef.getBoundingClientRect().top;
    const connextEl = document.querySelector('.connext-subscribe') || null;
    const connextElHeight = connextEl && connextEl.style.height ? parseInt(connextEl.style.height, 10) : 0;
    const { scrollY } = window;

    console.log('connextEl', connextEl);
    console.log('connetHeight', connextElHeight);

    if (navRef && aboveWindowShade && (navBottom >= contentTop)) {
      setOnMainContent(true);
      setAboveWindowShade(false);
    } else if (navBottom < contentTop) {
      if (docHasWindowShade()) {
        setOnMainContent(false);
        setAboveWindowShade(true);
      } else if (!aboveWindowShade && !onMainContent) {
        setAboveWindowShade(true);
      }
    } else if (docHasWindowShade(true) && scrollY <= 1) {
      setAboveWindowShade(false);
    }

    if (windowExists && connextEl && !connextEl.classList.contains('not-visible') && connextElHeight > 1 && aboveWindowShade) {
      setIgnoreEmptyConnextBar(true);
    } else if (ignoreEmptyConnextBar && !aboveWindowShade && docHasWindowShade()) setIgnoreEmptyConnextBar(false);
  }, 4);

  useEffect(() => {
    if (windowExists) {
      document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
          if (docHasWindowShade()) {
            setAboveWindowShade(true);
          } else if (docHasWindowShade(true)) {
            setAboveWindowShade(false);
          }
        }
      };
    }
  }, [aboveWindowShade]);

  useEffect(() => {
    if (windowExists) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    return null;
  }, [aboveWindowShade, onMainContent]);

  return (
    <>
      {!noAds && <div className={`${docHasWindowShade() ? 'leave-behind' : 'b-hidden'}`}>{HS01()}</div>}
      <div className={`nav-breaking-news ${aboveWindowShade ? 'is-above-shade' : ''}`} >
        {!omitBreakingNews && <BreakingNews />}
        <WeatherAlerts />
        <NavBar
          articleURL={articleURL}
          headlines={headlines}
          comments={comments}
          type={type}
          ampPage={ampPage}
          hasWindowShade={aboveWindowShade}
          ignoreEmptyConnextBar={ignoreEmptyConnextBar}
        />
      </div>
    </>
  );
};


TopNavBreakingNews.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
  type: PropTypes.string,
  subtype: PropTypes.string,
  ampPage: PropTypes.bool,
  noAds: PropTypes.bool,
  omitBreakingNews: PropTypes.bool,
};

export default TopNavBreakingNews;
