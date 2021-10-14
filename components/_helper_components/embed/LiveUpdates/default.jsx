import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import ContentElements from '../../article/contentElements/default.jsx';
import ArcAd from '../../../features/ads/default';
import TaboolaFeed from '../../../features/taboolaFeed/default';
import computeTimeStamp from '../../article/timestamp/_helper_functions/computeTimeStamp';
import getContentMeta from '../../global/siteMeta/_helper_functions/getContentMeta';
import { debounce } from '../../../features/gallery/_helper_functions';
import Byline from '../../article/byline/default';
import './default.scss';

/* this helper component renders the Custom Info Box as outlined in APD-1441 */
const LiveUpdates = ({ data: liveUpdates, enableTaboola = false }) => {
  const { paywallStatus } = getContentMeta();
  const isMeteredStory = paywallStatus === 'premium';
  if (!liveUpdates) return <span><i>There are no Live Updates to display.</i></span>;

  const appContext = useAppContext();
  const { requestUri } = appContext;
  const uriHasHash = requestUri.indexOf('#') > -1;
  const hashId = uriHasHash ? requestUri.substr(requestUri.indexOf('#') + 1) : null;
  const [activeUpdate, setActiveUpdate] = useState(hashId);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [updateTopPositions, setUpdateTopPositions] = useState([]);
  const stickyHeaderAdjustment = 90;
  let toggledAdSlot = 'HP03';

  const copyToClipboard = (e) => {
    e.preventDefault();
    let action = () => console.error('fallback in case Window or Navigator are unknown');
    if (window && navigator && navigator.clipboard) {
      const anchor = `${window.location.pathname}#${e.target.getAttribute('data-target')}`;
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
    switch (index) {
      case 0:
        response = <>
          <ArcAd
            staticSlot={'HP01-LiveUpdates'}
            key={`HP01-${index}`}
            customId={`div-id-HP01_${index}`}
          />
          <ArcAd
            staticSlot={'MP01-LiveUpdates'}
            key={`MP01-${index}`}
            customId={`div-id-MP01_${index}`}
          />
        </>;
        break;
      case 3:
        response = <>
          <ArcAd
            staticSlot={'RP01'}
            key={`RP01-${index}`}
            customId={`div-id-RP01_${index}`}
            lazyLoad={isMeteredStory}
          />
          <ArcAd
            staticSlot={'MP02'}
            key={`MP02-${index}`}
            customId={`div-id-MP02_${index}`}
            lazyLoad={isMeteredStory}
          />
        </>;
        break;
      case 5:
        response = <div className='story-newsletter_placeholder'></div>;
        break;
      case 6:
        response = <div className='story-nativo_placeholder--moap'></div>;
        break;
      case 9:
        response = <div className='story-interscroller__placeholder c-contentElements'></div>;
        break;
      default:
        response = <ArcAd
          staticSlot={toggledAdSlot}
          key={`${toggledAdSlot}-${index}`}
          customId={`div-id-${toggledAdSlot}_${index}`}
          lazyLoad={true}
        />;
        // we alternate HP03 & HP04 for all default slotnames, because there is a (slight) chance of two slots being visible at the same time
        toggledAdSlot = toggledAdSlot === 'HP03' ? 'HP04' : 'HP03';
    }
    return response;
  };

  const highlightNavItem = (hashTarget) => {
    const { innerHeight } = window || {};
    const activeLink = document.querySelector(`.c-liveUpdateNav a[href='#${activeUpdate}']`) || document.querySelector('.c-liveUpdateNav .is-active');
    if (activeLink) {
      activeLink.setAttribute('class', activeLink.className.replace('is-active', ''));
    }
    const targetLink = document.querySelector(`.c-liveUpdateNav a[href='#${hashTarget}']`);
    if (targetLink.className.indexOf('is-active') === -1) {
      targetLink.className += ' is-active';
    }
    // targetLink is outside the viewport from the bottom
    if (targetLink.getBoundingClientRect().bottom > innerHeight) {
      // The bottom of the targetLink will be aligned to the bottom of the visible area of the scrollable ancestor.
      targetLink.scrollIntoView(false);
    }

    // Target is outside the view from the top
    if (targetLink.getBoundingClientRect().top < 0) {
      // The top of the targetLink will be aligned to the top of the visible area of the scrollable ancestor
      targetLink.scrollIntoView();
    }
    setActiveUpdate(hashTarget);
  };

  const handleNavTrigger = (evt, hash) => {
    evt.preventDefault();
    let target = evt.target ? evt.target.getAttribute('href') : null;
    if (!target && evt) {
      // it's not the top-level link - but we do have an event - so we have to move up a level
      let parent = evt.target.parentNode;
      if (parent.nodeName !== 'A') {
        // timestamps are grandchildren of the nav `A` element so we need to go up one more level
        parent = parent.parentNode;
      }
      target = parent.getAttribute('href');
    }
    const hashTarget = !target && hash ? hash : target && target.substr(target.indexOf('#') + 1);
    const targetUpdate = document.querySelector(`[name='${hashTarget}']`) || null;
    if (targetUpdate) {
      // move to the selected update in the content area
      window.scrollTo({
        top: targetUpdate.offsetTop - stickyHeaderAdjustment, // to handle sticky header
        left: 0,
        behavior: 'smooth',
      });
      // udate the `is-active` indicator in the left nav
      highlightNavItem(hashTarget);
    }
  };

  const handleScroll = debounce(() => {
    const { scrollY } = window;
    let hasAMatch = false;
    const viewableHeight = scrollY + viewportHeight;
    updateTopPositions.forEach((update, i) => {
      if (hasAMatch) {
        // save lots of unnecessary processing by aborting early, since we've already matched an update's position
        return null;
      }

      const { 0: pos, 1: height, 2: hash } = update;
      const activeTriggerPos = scrollY + stickyHeaderAdjustment; // scrollY + viewportAdjustment;
      if (
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
      ) {
        hasAMatch = true;
        setActiveUpdate(hash);
        return highlightNavItem(hash);
      }
      return false;
    });
  }, 100);

  const determineUpdateTopPositions = () => {
    const { scrollY, innerHeight } = window;
    setViewportHeight(innerHeight);
    // re-set the array, in case we're re-running this (i.e. upon "complete" after having run on "interactive")
    setUpdateTopPositions([]);
    // populate updateTopPositions with the offsets of the updates
    document.querySelectorAll('.c-liveUpdate ').forEach(update => updateTopPositions.push([
      update.getBoundingClientRect().top + scrollY - stickyHeaderAdjustment,
      update.offsetHeight,
      update.getAttribute('name'),
    ]));
    setUpdateTopPositions(updateTopPositions);
  };

  useEffect(() => {
    document.onreadystatechange = () => {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        return determineUpdateTopPositions();
      }
      return null;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    window.addEventListener('resize', determineUpdateTopPositions);
    return () => {
      window.addEventListener('resize', determineUpdateTopPositions);
    };
  });

  const loopThroughUpdates = (isNav = false) => {
    const firstLiveUpdate = liveUpdates.slice(0, 1);
    const restOfLiveUpdates = liveUpdates.slice(1, liveUpdates.length);
    let updateIndex = 0;
    let mostRecentDate = null;
    const liveUpdatesMapper = updates => updates.map((update) => {
      const {
        headlines,
        _id: elId,
        content_elements: contentElements,
        display_date: displayDate,
        first_publish_date: firstPublishDate,
        credits,
      } = update;
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

      if (isNav) {
        if (!activeUpdate && updateIndex === 1) {
          setActiveUpdate(elId);
        }
        return <>
          {insertDateMarker && <a key={`${elId}-dateMarker`} className='date-marker' title={timestampDate}>
            <div className='timestamp'>{timestampDate.replace(',', '')}</div>
          </a>}
          <a href={`#${elId}`} key={`${elId}-anchor`} onClick={handleNavTrigger} className={activeUpdate === elId ? 'is-active' : ''} title={`${timestampTime}: ${headline.replace(/"/g, '\'')}`}>
            <div className='headline hidden-mobile'>{headline}</div>
            <div className='timestamp'>
              <span className={`timestamp-date ${isToday ? 'same-day' : ''}`}>{timestampDate} </span>
              <span className='timestamp-time'>{timestampTime}</span>
            </div>
          </a>
        </>;
      }

      return <>
        <div className={`c-liveUpdate ${insertDateMarker ? 'with-date-marker' : ''}`} name={elId} key={elId}>
          {insertDateMarker && <div className='date-marker'>{timestampDate}</div>}
          <div className='c-headline'>
            <h2>{headline}</h2>
            <a className='link-anchor' href='#' data-target={elId} title='Click here to copy the link for this update to your clipboard.' onClick={e => copyToClipboard(e)}></a>
          </div>
          <div className='c-timestampByline'>
            <div className='timestamp-time'>{timestampTime}</div>
            <Byline by={authorData} sections={[]} excludeOrg={true} />
          </div>
          <div className='liveUpdate-content' key={`${elId}-content`}>
            <ContentElements contentElements={contentElements} ampPage={false} />
          </div>
        </div>
        {/* we insert items (ads, placeholders, etc) at specific intervals.
          For ads, it's after the first and every 3rd item after that (thus the "updateIndex - 1 is divisible by 3" logic -- for the 4th, 7th, 10th, etc instances)
          We also have one for the newsletter placeholder (after #6)
        */}
        {(updateIndex === 1 || updateIndex === 6 || (updateIndex > 3 && (updateIndex - 1) % 3 === 0)) && renderAdOrPlaceholder(updateIndex - 1)}
        {hashId && updateIndex === liveUpdates.length && handleNavTrigger(null, hashId)}
      </>;
    });

    if (isMeteredStory && !isNav) {
      return <>
        {liveUpdatesMapper(firstLiveUpdate)}
        <div className='story-paygate_placeholder'>
         {liveUpdatesMapper(restOfLiveUpdates)}
        </div>
      </>;
    }

    return liveUpdatesMapper(liveUpdates);
  };

  return <div className='c-liveUpdates'>
    <div className='c-liveUpdateNav'>
      <div className='c-navTitle'><span className='hidden-mobile'>Latest Updates</span></div>
      {loopThroughUpdates(true)}
    </div>
    <div className='c-liveUpdateContent'>
      {loopThroughUpdates()}
      {enableTaboola && <TaboolaFeed ampPage={false} lazyLoad={true} treatAsArticle={true} />}
    </div>
  </div>;
};


LiveUpdates.propTypes = {
  data: PropTypes.array,
  enableTaboola: PropTypes.bool,
};
LiveUpdates.defaultProps = {
  componentName: 'LiveUpdates',
};

export default LiveUpdates;
