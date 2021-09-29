import React from 'react';
import PropTypes from 'prop-types';
import ContentElements from '../../article/contentElements/default.jsx';
import ArcAd from '../../../features/ads/default';
import './default.scss';

/* this helper component renders the Custom Info Box as outlined in APD-1441 */
const LiveUpdates = ({ data: liveUpdates }) => {
  if (!liveUpdates) return <span><i>There are no Live Updates to display.</i></span>;

  const renderAdOrPlaceholder = (index) => {
    let response = '';
    switch (index) {
      case 0:
        response = <>
          <ArcAd
            staticSlot={'HP01'}
            key={`HP01-${index}`}
            customId={`div-id-HP01_${index}`}
          />
          <ArcAd
            staticSlot={'MP01'}
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
          />
          <ArcAd
            staticSlot={'MP02'}
            key={`MP02-${index}`}
            customId={`div-id-MP02_${index}`}
          />
        </>;
        break;
      case 5:
        response = <div className='newsletterPlaceholder'></div>;
        break;
      case 6:
        response = <div className='story-nativo_placeholder--moap'></div>;
        break;
      case 9:
        response = <div className='story-interscroller__placeholder c-contentElements'></div>;
        break;
      default:
        response = <ArcAd
          staticSlot={'HP05'}
          key={`HP05-${index}`}
          customId={`div-id-HP05_${index}`}
        />;
    }
    return response;
  };

  const loopThroughUpdates = (isNav = false) => {
    const handleNavTrigger = (evt) => {
      console.log(evt);
    };
    let updateIndex = 0;
    return liveUpdates.map((update) => {
      const {
        headlines,
        _id: elId,
        content_elements: contentElements,
      } = update;
      const { basic: headline } = headlines || {};
      if (!headline) return null;

      updateIndex += 1;
      if (isNav) {
        return <a href={`#${elId}`} key={`${elId}-anchor`} onClick={handleNavTrigger}>{headline}</a>;
      }

      const liveUpdateContent = () => <div className={'c-liveUpdate'} name={elId} key={elId}>
        <h2 key={headline}>{headline}</h2>
        <div className={'liveUpdate-content'} key={`${elId}-content`}>
          <ContentElements contentElements={contentElements} ampPage={false} />
          {/* we insert items (ads, placeholders, etc) at specific intervals.

            For ads, it's after the first and every 3rd item after that (thus the "updateIndex - 1 is divisible by 3" logic -- for the 4th, 7th, 10th, etc instances)

            We also have one for the newsletter placeholder (after #6)
          */}
          {(updateIndex === 1 || updateIndex === 6 || (updateIndex > 3 && (updateIndex - 1) % 3 === 0)) && renderAdOrPlaceholder(updateIndex - 1)}
        </div>
      </div>;

      return liveUpdateContent();
    });
  };

  return <div className={'c-liveUpdates'}>
    <div className={'c-liveUpdateNav'}>{loopThroughUpdates(true)}</div>
    <div className={'c-liveUpdateContent'}>{loopThroughUpdates()}</div>
  </div>;
};


LiveUpdates.propTypes = {
  data: PropTypes.array,
};
LiveUpdates.defaultProps = {
  componentName: 'LiveUpdates',
};

export default LiveUpdates;
