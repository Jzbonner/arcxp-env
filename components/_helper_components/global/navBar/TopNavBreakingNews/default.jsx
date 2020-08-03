import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../default';
import BreakingNews from '../../breakingNews/default';
import ArcAd from '../../../../features/ads/default';
import WeatherAlerts from '../../weatherAlerts/default';
import { debounce } from '../../../../features/gallery/_helper_functions';
import '../../../../../src/styles/base/_utility.scss';
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
  const windowExists = typeof window !== 'undefined';

  const docHasWindowShade = () => {
    if (windowExists) {
      const docBody = document.querySelector('body');
      return docBody.classList.contains('window-shade');
    }
    return null;
  };

  const handleScroll = debounce(() => {
    const navRef = document.querySelector('.c-headerNav.stickyActive');
    const navBottom = navRef && navRef.getBoundingClientRect().bottom;
    const pageContentRef = document.querySelector('main');
    const contentTop = pageContentRef && pageContentRef.getBoundingClientRect().top;

    if (navRef && aboveWindowShade && (navBottom >= contentTop)) {
      setOnMainContent(true);
      setAboveWindowShade(false);
    } else if (!aboveWindowShade && !onMainContent && (navBottom < contentTop)) {
      setAboveWindowShade(true);
    }
  }, 12);

  useEffect(() => {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        if (docHasWindowShade()) setAboveWindowShade(true);
      }
    };
  }, [aboveWindowShade]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [aboveWindowShade, onMainContent]);

  return (
    <>
      {!noAds && <div className="b-hidden">{HS01()}</div>}
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
