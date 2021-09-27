import React from 'react';
import PropTypes from 'prop-types';
import ContentElements from '../../article/contentElements/default.jsx';
import ArcAd from '../../../features/ads/default';
import './default.scss';

/* this helper component renders the Custom Info Box as outlined in APD-1441 */
const LiveUpdates = ({ data: liveUpdates }) => {
  const loopThroughUpdates = (isNav = false) => {
    let updateIndex = 0;
    const handleNavTrigger = (evt) => {
      console.log(evt);
    };
    liveUpdates.map((update) => {
      const {
        type,
        headlines,
        _id: elId,
        content_elements: contentElements,
      } = update;
      const { basic: headline } = headlines || {};
      // only proceed if it's a live update
      if (type !== 'liveupdates' || !headline) return null;

      if (isNav) {
        return <a href={`#${elId}`} key={`${elId}-anchor`} onClick={handleNavTrigger}>{headline}</a>;
      }

      const liveUpdateContent = () => <div className={'c-liveUpdate'} name={elId} key={elId}>
        <h2 key={headline}>{headline}</h2>
        <div className={'liveUpdate-content'} key={`${elId}-content`}>
          <ContentElements contentElements={contentElements} ampPage={false} />
          {(updateIndex === 0 || updateIndex % 3 === 0) && <ArcAd
              staticSlot={'HP05'}
              key={`HP05-${updateIndex}`}
              customId={`div-id-HP05_${updateIndex}`}
            />}
        </div>
      </div>;
      updateIndex += 1;

      return liveUpdateContent();
    });
  };

  return <div className={'c-liveUpdates'}>
    <div className={'c-liveUpdateNav'}>
      {loopThroughUpdates(true)}
    </div>
    <div className={'c-liveUpdateContent'}>
      {loopThroughUpdates()}
    </div>
  </div>;
};


LiveUpdates.propTypes = {
  data: PropTypes.array,
};
LiveUpdates.defaultProps = {
  componentName: 'LiveUpdates',
};

export default LiveUpdates;
