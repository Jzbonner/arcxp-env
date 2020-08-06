import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const PGO1Element = ({ adSlot, refHook, galleryTopics = [] }) => (
    <div id="ad-pgo1-parent" ref={refHook} className="pg01-container">
      {adSlot && adSlot(galleryTopics)}
    </div>
);


PGO1Element.propTypes = {
  adSlot: PropTypes.func,
  refHook: PropTypes.object,
  galleryTopics: PropTypes.array,
};

export default PGO1Element;
