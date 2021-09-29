import React from 'react';
import PropTypes from 'prop-types';
import ContentElements from '../../article/contentElements/default.jsx';
import ArcAd from '../../../features/ads/default';
import './default.scss';

/* this helper component renders the Custom Info Box as outlined in APD-1441 */
const LiveUpdates = ({ data: liveUpdates }) => {
  if (!liveUpdates) return <span><i>There are no Live Updates to display.</i></span>;

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
      // only proceed if it's a live update
      if (!headline) return null;

      updateIndex += 1;
      if (isNav) {
        return <a href={`#${elId}`} key={`${elId}-anchor`} onClick={handleNavTrigger}>{headline}</a>;
      }

      const liveUpdateContent = () => <div className={'c-liveUpdate'} name={elId} key={elId}>
        <h2 key={headline}>{headline}</h2>
        <div className={'liveUpdate-content'} key={`${elId}-content`}>
          <ContentElements contentElements={contentElements} ampPage={false} />
          {(updateIndex === 1 || updateIndex % 4 === 0) && <ArcAd
              staticSlot={'HP05'}
              key={`HP05-${updateIndex}`}
              customId={`div-id-HP05_${updateIndex}`}
            />}
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
