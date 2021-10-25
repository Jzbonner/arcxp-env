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
  const windowExists = typeof window !== 'undefined';
  const { enableDarkMode, inMemoriam } = getContentMeta();
  const appContext = useAppContext();
  const { isAdmin } = appContext;
  const darkModeWithAds = !enableDarkMode || (enableDarkMode && !inMemoriam);

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
      // add the dark-mode class to ensure body bg is blacked out
      document.querySelector('body').classList += ` ${enableDarkMode ? 'dark-mode ' : ''}`;
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

  return (
    <>
      {!noAds && darkModeWithAds && !isAdmin && <div className={`${docHasWindowShade() ? 'leave-behind' : 'b-hidden'}`}>{HS01(galleryTopics)}</div>}
      <div className={`nav-breaking-news ${enableDarkMode ? 'dark-mode' : ''} ${aboveWindowShade ? 'is-above-shade' : ''} ${docHasWindowShade(true) || hasHalfShade ? 'with-half-shade' : ''}`} >
        <WeatherAlerts />
        <NavBar
          articleURL={articleURL}
          headlines={headlines}
          comments={comments}
          type={type}
          ampPage={ampPage}
          hasWindowShade={aboveWindowShade}
          omitBreakingNews={omitBreakingNews}
          enableDarkMode={enableDarkMode}
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
