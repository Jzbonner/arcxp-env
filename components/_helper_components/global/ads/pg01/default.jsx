import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const PGO1Element = ({ adSlot, refHook }) => (
    <div id="ad-pgo1-parent" ref={refHook} className="pg01-container">
      {adSlot && adSlot()}
    </div>
);


PGO1Element.propTypes = {
  adSlot: PropTypes.func,
  refHook: PropTypes.object,
};

export default PGO1Element;
