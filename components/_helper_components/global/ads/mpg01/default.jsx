import React from 'react';
import PropTypes from 'prop-types';

const MPGO1Element = ({
  adSlot,
  adCount,
  refHook,
  galleryTopics = [],
}) => (
    <div ref={refHook} className={`ad-mpg01-parent b-margin-bottom-5 ${refHook ? 'is-embed' : ''}`}>
      {adSlot && adSlot(adCount, galleryTopics)}
    </div>
);


MPGO1Element.propTypes = {
  adSlot: PropTypes.func,
  adCount: PropTypes.number,
  refHook: PropTypes.object,
  galleryTopics: PropTypes.array,
};

export default MPGO1Element;
