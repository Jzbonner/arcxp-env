import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import ContentElements from '../../article/contentElements/default.jsx';
import ArcAd from '../../../features/ads/default';
import TaboolaFeed from '../../../features/taboolaFeed/default';
import computeTimeStamp from '../../article/timestamp/_helper_functions/computeTimeStamp';
import getContentMeta from '../../global/siteMeta/_helper_functions/getContentMeta';
import Byline from '../../article/byline/default';
import LeftNav from './leftNav/default';
import './default.scss';

/* this helper component renders the Custom Info Box as outlined in APD-1441 */
const LiveUpdates = ({ data: liveUpdates, enableTaboola = false }) => {
  const { pageIsLive, paywallStatus } = getContentMeta();
  const isMeteredStory = paywallStatus === 'premium';
  if (!liveUpdates || !pageIsLive) return <span><i>There are no Live Updates to display.</i></span>;

  const appContext = useAppContext();
  const { requestUri } = appContext;
  const uriHasHash = requestUri.indexOf('#') > -1;
  const hashId = uriHasHash ? requestUri.substr(requestUri.indexOf('#') + 1) : null;
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
          {isMeteredStory && <div className='story-paygate_placeholder'></div>}
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

  const loopThroughUpdates = (isNav = false) => {
    const handleNavTrigger = (evt) => {
      console.log('handlenavtrigger', evt.target);
    };
    let updateIndex = 0;
    let mostRecentDate = null;
    return liveUpdates.map((update) => {
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
        return <LeftNav
          key={elId}
          isActive={(!uriHasHash && updateIndex === 1) || (uriHasHash && hashId === elId)}
          elId={elId}
          headline={headline}
          timestampDate={timestampDate}
          timestampTime={timestampTime}
          isToday={isToday}
          insertDateMarker={insertDateMarker}
          handleNavTrigger={handleNavTrigger}
        />;
      }

      const liveUpdateContent = () => <>
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
      </>;

      return liveUpdateContent();
    });
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
