import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import NavBar from '../default';
import ArcAd from '../../../../features/ads/default';
import WeatherAlerts from '../../weatherAlerts/default';
import { debounce } from '../../../../features/gallery/_helper_functions';
import getContentMeta from '../../siteMeta/_helper_functions/getContentMeta';
import './default.scss';

const HS01 = galleryTopics => <ArcAd staticSlot={'HS01'} galleryTopics={galleryTopics} />;

const TopNavBreakingNews = ({
  articleURL,
  headlines,
  comments,
  type,
  ampPage = false,
  noAds = false,
  omitBreakingNews = false,
  galleryTopics = [],
}) => {
  const [aboveWindowShade, setAboveWindowShade] = useState(false);
  const [hasHalfShade, setHasHalfShade] = useState(false);
  const [darkModeToggled, setDarkModeToggle] = useState('');
  const windowExists = typeof window !== 'undefined';
  const { darkMode, inMemoriam, darkHeaderFooter } = getContentMeta();
  const appContext = useAppContext();
  const { isAdmin, globalContent, arcSite } = appContext;
  const { taxonomy } = globalContent || {};
  const { tags = [] } = taxonomy || {};
  const hasNoAdsTag = tags.some(tag => tag && tag.text && tag.text.toLowerCase() === 'no-ads');
  const darkModeWithAds = !darkMode || (darkMode && !inMemoriam);
  const darkModeSite = `${arcSite}_dark-mode`;
  const darkModeStyling = darkMode || inMemoriam || darkHeaderFooter;

  const docHasWindowShade = (checkCollapse, checkHalfShade) => {
    if (windowExists) {
      const docBody = document.querySelector('body');
      if (checkCollapse) {
        return docBody.classList.contains('window-shade-collapsed');
      }

      if (checkHalfShade) {
        return docBody.querySelector('#div-id-HS01 > div')?.innerHTML !== '';
      }

      return docBody.classList.contains('window-shade');
    }
    return null;
  };

  const storyHasShade = (docHasWindowShade(true) && !hasNoAdsTag) || (hasHalfShade && !hasNoAdsTag) ? 'with-half-shade' : '';

  const handleScroll = debounce(() => {
    const { scrollY } = window;

    if (!aboveWindowShade && docHasWindowShade()) {
      setAboveWindowShade(true);
    } else if (docHasWindowShade(true) && scrollY <= 1) {
      setAboveWindowShade(false);
    }
  }, 2);

  useEffect(() => {
    if (windowExists) {
      const docBody = document.querySelector('body');
      const docBodyClass = docBody.getAttribute('class') || '';
      // add the dark-mode class to ensure body bg is blacked out
      if ((inMemoriam || darkHeaderFooter) && docBodyClass.indexOf('special') === -1) {
        docBody.classList += ' special';
      }

      document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
          if (docHasWindowShade()) {
            setAboveWindowShade(true);
          } else if (docHasWindowShade(true)) {
            setAboveWindowShade(false);
            setHasHalfShade(true);
          } else if (docHasWindowShade(null, true)) {
            setHasHalfShade(true);
          }
        }
      };
    }
  }, [aboveWindowShade, hasHalfShade]);

  useEffect(() => {
    if (windowExists) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    return null;
  }, [aboveWindowShade]);

  useEffect(() => {
    if (typeof window !== 'undefined' && darkMode) {
      // Dark/ Light mode already saved in local storage
      if (window.localStorage.getItem(darkModeSite) === 'enabled') {
        setDarkModeToggle(true);
      } else if (window.localStorage.getItem(darkModeSite) === 'disabled') {
        setDarkModeToggle(false);
        // Dark scheme on user machine settings but previously toggled AJC dark mode
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && window.localStorage.getItem(darkModeSite) === 'enabled') {
        setDarkModeToggle(true);
        // Dark scheme on user machine settings, set local storage preference to dark and add dark mode styling
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkModeToggle(true);
        window.localStorage.setItem(darkModeSite, 'enabled');
        document.querySelector('body').classList += ' dark-mode';
      } else {
        // Light mode or no preference, no AJC dark mode
        setDarkModeToggle(false);
        window.localStorage.setItem(darkModeSite, 'disabled');
      }
    }
  }, []);

  return (
    <>
      {!noAds && darkModeWithAds && !isAdmin && <div className={`${docHasWindowShade() ? 'leave-behind' : 'b-hidden'}`}>{HS01(galleryTopics)}</div>}
      <div className={`nav-breaking-news ${darkModeStyling ? 'dark-mode' : ''} ${aboveWindowShade ? 'is-above-shade' : ''} ${storyHasShade}`} >
        <WeatherAlerts />
        <NavBar
          articleURL={articleURL}
          headlines={headlines}
          comments={comments}
          type={type}
          ampPage={ampPage}
          hasWindowShade={aboveWindowShade}
          omitBreakingNews={omitBreakingNews}
          enableDarkMode={darkMode}
          darkModeToggled={darkModeToggled}
          setDarkModeToggle={setDarkModeToggle}
          inMemoriam={inMemoriam || darkHeaderFooter}
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
  galleryTopics: PropTypes.array,
};

export default TopNavBreakingNews;
