import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import ContentElements from '../../article/contentElements/default.jsx';
import filterContentElements from '../../../layouts/_helper_functions/article/filterContentElements';
import ArcAd from '../../../features/ads/default';
import fetchEnv from '../../global/utils/environment';
import TaboolaFeed from '../../../features/taboolaFeed/default';
import computeTimeStamp from '../../article/timestamp/_helper_functions/computeTimeStamp';
import getContentMeta from '../../global/siteMeta/_helper_functions/getContentMeta';
import GetConnextLocalStorageData from '../../global/connext/connextLocalStorage';
import { ConnextAuthTrigger } from '../../global/connext/default';
import Byline from '../../article/byline/default';
import './default.scss';

/* this helper component renders the Custom Info Box as outlined in APD-1441 */
const LiveUpdates = ({ data: liveUpdates, enableTaboola = false, isTimeline = false }) => {
  const { paywallStatus } = getContentMeta();
  const isMeteredStory = paywallStatus === 'premium';
  if (!liveUpdates) return <span><i>There are no Live Updates to display.</i></span>;

  const hashId = typeof window !== 'undefined' ? window.location.hash.substr(1) : null;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { connext } = getProperties(arcSite);
  const currentEnv = fetchEnv();
  const { siteCode, configCode, environment } = connext[currentEnv] || {};
  const connextLocalStorageData = GetConnextLocalStorageData(siteCode, configCode, environment) || {};
  const { UserState: userState } = connextLocalStorageData;
  // eslint-disable-next-line no-mixed-operators
  const isLoggedOut = userState && userState.toLowerCase() === 'logged out' || true;
  let hashBeforeLogin;
  let activeUpdate = hashId;
  let viewportHeight = 0;
  let lastScrollPos = 0;
  let updateTopPositions = [];
  let isScrolling = false;
  let timeout;
  const stickyHeaderAdjustment = 80;
  let toggledAdSlot = 'HP03';

  const copyToClipboard = (e) => {
    e.preventDefault();
    let action = () => console.error('fallback in case Window or Navigator are unknown');
    if (document && navigator && navigator.clipboard) {
      const anchor = `${document.location.origin}${document.location.pathname}#${e.target.getAttribute('data-target')}`;
      action = navigator.clipboard.writeText(anchor).then(() => console.log(`Async: Copying ${anchor} to clipboard was successful!`), err => console.error('Async: Could not copy text: ', err)).then(() => {
        e.target.classList.value += ' is-clicked';
        setTimeout(() => {
          e.target.classList.value = e.target.classList.value.replace(' is-clicked', '');
        }, 1500);
      });
    }
    return action;
  };

  const renderAdOrPlaceholder = (index) => {
    let response = '';

    if (isTimeline) {
      // we exclude all inline content except for newsletters, for timeline presentations
      if (index === 5) {
        return <div className='story-newsletter_placeholder' key={`placeholder-${index}`}></div>;
      }
      return null;
    }

    switch (index) {
      case 0:
        response = <>
          <ArcAd
            staticSlot={'HP01-LiveUpdates'}
            key={`HP01-${index}`}
          />
          <ArcAd
            staticSlot={'MP01-LiveUpdates'}
            key={`MP01-${index}`}
          />
        </>;
        break;
      case 3:
        response = <>
          <ArcAd
            staticSlot={'RP01-LiveUpdates'}
            key={`RP01-${index}`}
            lazyLoad={isMeteredStory}
          />
          <ArcAd
            staticSlot={'MP02-LiveUpdates'}
            key={`MP02-${index}`}
            lazyLoad={isMeteredStory}
          />
        </>;
        break;
      case 5:
        response = <div className='story-newsletter_placeholder' key={`placeholder-${index}`}></div>;
        break;
      case 6:
        response = <div className='story-nativo_placeholder--moap' key={`placeholder-${index}`}></div>;
        break;
      case 9:
        response = <div className='story-interscroller__placeholder c-contentElements' key={`placeholder-${index}`}></div>;
        break;
      default:
        response = <ArcAd
          staticSlot={`${toggledAdSlot}-LiveUpdates`}
          key={`${toggledAdSlot}-${index}`}
          customId={`div-id-${toggledAdSlot}_${index}`}
          lazyLoad={isMeteredStory}
        />;
        // we alternate HP03 & HP04 for all default slotnames, because there is a (slight) chance of two slots being visible at the same time
        toggledAdSlot = toggledAdSlot === 'HP03' ? 'HP04' : 'HP03';
    }
    return response;
  };

  const handleMetricsEventDispatch = (liveUpdateTitle, index) => {
    const liveUpdateMetricsFired = new CustomEvent('liveUpdateMetricsFired', {
      detail: {
        title: liveUpdateTitle,
        scrollDepth: window.scrollY,
        index,
      },
    });

    document.dispatchEvent(liveUpdateMetricsFired);
  };

  const highlightNavItem = (hashTarget, highlightFromHash) => {
    if (hashTarget !== activeUpdate || highlightFromHash) {
      const activeLink = document.querySelector(`a[href='#${activeUpdate}']`) || document.querySelector('.c-liveUpdateNav .is-active');
      if (activeLink) {
        activeLink.setAttribute('class', activeLink.className.replace('is-active', ''));
      }
      const targetLink = document.querySelector(`a[href='#${hashTarget}']`);
      const targetLinkTitle = targetLink && targetLink.getAttribute('title');
      const targetLinkIndex = targetLink && targetLink.getAttribute('index');

      if (targetLink) {
        const { top: targetLinkTop, bottom: targetLinkBottom } = targetLink.getBoundingClientRect();
        if (targetLink.className.indexOf('is-active') === -1) {
          targetLink.className += ' is-active';
        }
        // targetLink is outside the viewport from the bottom
        if (targetLinkBottom > viewportHeight + 10) {
          // The bottom of the targetLink will be aligned to the bottom of the visible area of the scrollable ancestor.
          targetLink.scrollIntoView(false);
        }

        // Target is outside the view from the top
        if (targetLinkTop < 10) {
          // The top of the targetLink will be aligned to the top of the visible area of the scrollable ancestor
          targetLink.scrollIntoView(true);
        }

        handleMetricsEventDispatch(targetLinkTitle, targetLinkIndex);
      }

      activeUpdate = hashTarget;
    } else if (document.querySelector('.c-liveUpdateNav .is-active') === null) {
      const targetLink = document.querySelector(`a[href='#${activeUpdate}']`);
      if (targetLink) targetLink.className += ' is-active';
    }
  };

  const handleNavTrigger = (evt, hash) => {
    let target = null;
    let liveUpdateTitle = null;
    let liveUpdateIndex = null;

    if (evt) {
      evt.preventDefault();
      liveUpdateIndex = evt?.target?.getAttribute('index') || null;
      target = evt.target ? evt.target.getAttribute('href') : null;
      liveUpdateTitle = evt?.target?.textContent;
    }

    if (!target && evt) {
      // it's not the top-level link - but we do have an event - so we have to move up a level
      let parent = evt.target.parentNode;
      if (parent.nodeName !== 'A') {
        // timestamps are grandchildren of the nav `A` element so we need to go up one more level
        parent = parent.parentNode;
      }

      liveUpdateIndex = parent.getAttribute('index');
      target = parent.getAttribute('href');
    }
    const hashTarget = !target && hash ? hash : target && target.substr(target.indexOf('#') + 1);
    const targetUpdate = document.querySelector(`[name='${hashTarget}']`) || null;

    if (liveUpdateTitle) {
      handleMetricsEventDispatch(liveUpdateTitle, liveUpdateIndex);
    }

    if (isLoggedOut) {
      hashBeforeLogin = targetUpdate;
    }

    if (targetUpdate) {
      targetUpdate.scrollIntoView(true);
    }
  };

  const handleScroll = () => {
    if (!isScrolling) {
      isScrolling = true;

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const { scrollY } = window;
        if (lastScrollPos !== scrollY) {
          lastScrollPos = scrollY;
        }
        let hasAMatch = false;
        const viewableHeight = lastScrollPos + viewportHeight;
        updateTopPositions.forEach((update, i) => {
          if (hasAMatch) {
            // save lots of unnecessary processing by aborting early, since we've already matched an update's position
            return null;
          }

          const { 0: pos, 1: height, 2: hash } = update;
          const activeTriggerPos = lastScrollPos + stickyHeaderAdjustment;
          if (
            (
              updateTopPositions.length > 1
              && activeTriggerPos < updateTopPositions[1][0]
            ) || (
              activeTriggerPos >= pos
              && (
                (
                  i < updateTopPositions.length - 1
                  && (
                    pos + height > viewableHeight
                    || (
                      pos + height <= viewableHeight
                      && activeTriggerPos < updateTopPositions[i + 1][0]
                    )
                  )
                )
                || i === updateTopPositions.length - 1
              )
            )
          ) {
            hasAMatch = true;
            return highlightNavItem(hash);
          }
          return false;
        });
        isScrolling = false;
      }, 200);
    }
  };

  const determineUpdateTopPositions = (recalc) => {
    // populate updateTopPositions with the positions of each update snippet
    let currentTopPositions = updateTopPositions;
    const { innerHeight, scrollY } = window;
    if (lastScrollPos !== scrollY) {
      lastScrollPos = scrollY;
    }
    if (recalc) {
      currentTopPositions = [];
      viewportHeight = innerHeight;
    }
    const allUpdates = document.querySelectorAll('.c-liveUpdate');
    allUpdates.forEach((update, i) => {
      if (!update || (!recalc && update._boundingClientRect)) return null;

      const updateBoundaries = update.getBoundingClientRect();
      allUpdates[i]._boundingClientRect = updateBoundaries;
      return currentTopPositions.push([
        updateBoundaries.top + lastScrollPos - stickyHeaderAdjustment,
        updateBoundaries.bottom - updateBoundaries.top,
        update.querySelector('.snippet-anchor').getAttribute('name'),
      ]);
    });
    updateTopPositions = currentTopPositions;
  };

  useEffect(() => {
    determineUpdateTopPositions(true);

    if (window.history.scrollRestoration) {
      // prevent the browser from auto-scrolling to the last position on the page, if it's a refresh
      window.history.scrollRestoration = 'manual';
    }

    if (hashId.length) {
      // we use a timeout to ensure enough time has passed for the snippets to (lazy) load, and the user is taken to the correct position on the page
      setTimeout(() => {
        document.querySelector(`[href='#${hashId}']`).click();
        highlightNavItem(hashId, true);
      }, 2000);
    }
  }, [hashId]);

  /* set the last dispact within the handleScroll func */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('connextLoggedIn', () => {
      if (hashBeforeLogin) hashBeforeLogin.scrollIntoView(true);
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('connextLoggedIn');
    };
  }, []);

  let resizeObserver = {
    observe: () => { },
    unobserve: () => { },
  }; // fallback for non-existence of ResizeObserver (i.e. SSR)

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      determineUpdateTopPositions(true);
    });
  }

  useEffect(() => {
    const liveUpdateContent = document.querySelector('.c-liveUpdateContent');
    resizeObserver.observe(liveUpdateContent);
    return () => {
      resizeObserver.unobserve(liveUpdateContent);
    };
  }, []);

  const loopThroughUpdates = (isNav = false) => {
    const firstLiveUpdate = liveUpdates.slice(0, 1);
    const restOfLiveUpdates = liveUpdates.slice(1, liveUpdates.length);
    let updateIndex = 0;
    let mostRecentDate = null;
    const liveUpdatesMapper = updates => updates.map((update, i) => {
      const {
        headlines,
        _id: elId,
        content_elements: contentElements,
        display_date: displayDate,
        first_publish_date: firstPublishDate,
        credits,
      } = update;
      const filteredContentElements = filterContentElements({ contentElements });
      const { basic: headline } = headlines || {};
      const { by: authorData } = credits || {};
      if (!headline) return null;

      const {
        timestampDate,
        timestampTime,
        isToday,
      } = computeTimeStamp(firstPublishDate, displayDate, false, false, 'liveupdate-full', true) || {};
      const insertDateMarker = !isToday && timestampDate !== mostRecentDate;
      mostRecentDate = timestampDate;

      updateIndex += 1;
      const isFirstUpdate = updateIndex === 1;

      if (isNav) {
        if (!activeUpdate && isFirstUpdate) {
          activeUpdate = elId;
        }
        return <>
          {!isTimeline && insertDateMarker && <a key={`${elId}-dateMarker`} className='date-marker' title={timestampDate}>
            <div className='timestamp'>{timestampDate.replace(',', '')}</div>
          </a>}
          <a href={`#${elId}`} key={`${elId}-anchor`} onClick={handleNavTrigger} className={activeUpdate === elId ? 'is-active' : ''} index={`${i}`} title={`${timestampTime}: ${headline.replace(/"/g, '\'')}`}>
            <div className='headline hidden-mobile'>{headline}</div>
            <div className='timestamp'>
              <span className={`timestamp-date ${isToday ? 'same-day' : ''}`}>{timestampDate} </span>
              {!isTimeline && <span className='timestamp-time'>{timestampTime}</span>}
            </div>
          </a>
        </>;
      }

      const updateContentOutput = () => <>
        <div className={`c-liveUpdate ${!isFirstUpdate && insertDateMarker ? 'with-date-marker' : ''}`} key={elId}>
          {!isFirstUpdate && insertDateMarker && <div className='date-marker'>{timestampDate}</div>}
          <div className='c-headline'>
            <h2>{headline}</h2>
            <a className='link-anchor' href='#' data-target={elId} title='Click here to copy the link for this update to your clipboard.' onClick={e => copyToClipboard(e)}></a>
            <span name={elId} className='snippet-anchor'></span>
          </div>
          <div className='c-timestampByline'>
            {!isTimeline && <div className='timestamp-time'>{timestampTime}</div>}
            <Byline by={authorData} sections={[]} excludeOrg={true} />
          </div>
          <div className='liveUpdate-content' key={`${elId}-content`}>
            <ContentElements contentElements={filteredContentElements} ampPage={false} />
          </div>
        </div>
      </>;

      if (isFirstUpdate) {
        // we don't lazyload the first update
        return <>
          {updateContentOutput()}
          {renderAdOrPlaceholder(updateIndex - 1)}
        </>;
      }

      return <>
        <LazyLoad placeholder={<div className="c-placeholder-liveUpdate"><span name={elId} className='snippet-anchor'></span></div>} height="100%" width="100%" offset={100 * updateIndex} once={true} overflow={false} key={`${elId}-lazy`}>
          {updateContentOutput()}
        </LazyLoad>
        {/* we insert items (ads, placeholders, etc) at specific intervals.
          For ads, it's after the first and every 3rd item after that (thus the "updateIndex - 1 is divisible by 3" logic -- for the 4th, 7th, 10th, etc instances)
          We also have one for the newsletter placeholder (after #6)
        */}
        {(updateIndex === 6 || (updateIndex > 3 && (updateIndex - 1) % 3 === 0)) && renderAdOrPlaceholder(updateIndex - 1)}
      </>;
    });

    if (!isNav) {
      return <>
        {liveUpdatesMapper(firstLiveUpdate)}
        <div className='story-paygate_placeholder' key={'paygate'}>
          {liveUpdatesMapper(restOfLiveUpdates)}
          {enableTaboola && <>
            <TaboolaFeed ampPage={false} lazyLoad={isMeteredStory} treatAsArticle={true} />
            <div className='taboola-split'>
              <div className='story-nativo_placeholder--boap'></div>
            </div>
          </>}
        </div>
      </>;
    }

    return liveUpdatesMapper(liveUpdates);
  };

  return <div className={`c-liveUpdates ${isTimeline ? 'is-timeline' : ''}`}>
    <div className='c-liveUpdateNav'>
      <div className='c-navTitle'><span className='hidden-mobile'>{isTimeline ? 'Timeline' : 'Latest Updates'}</span></div>
      {loopThroughUpdates(true)}
    </div>
    <div className='c-liveUpdateContent'>
      {loopThroughUpdates()}
      {/* if it's a metered story, add the connext auth handlers to load deferred items (e.g. anything with `lazyLoad` above) */}
      {isMeteredStory && ConnextAuthTrigger()}
    </div>
  </div>;
};


LiveUpdates.propTypes = {
  data: PropTypes.array,
  enableTaboola: PropTypes.bool,
  isTimeline: PropTypes.bool,
};
LiveUpdates.defaultProps = {
  componentName: 'LiveUpdates',
};

export default LiveUpdates;
