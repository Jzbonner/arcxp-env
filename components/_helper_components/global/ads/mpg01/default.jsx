import React from 'react';
import PropTypes from 'prop-types';

const MPGO1Element = ({ adSlot, adCount, refHook }) => (
    <div id="ad-mpgo1-parent" ref={refHook} className="b-margin-bottom-5">
      {adSlot && adSlot(adCount)}
    </div>
);


MPGO1Element.propTypes = {
  adSlot: PropTypes.func,
  adCount: PropTypes.number,
  refHook: PropTypes.object,
};

export default MPGO1Element;
