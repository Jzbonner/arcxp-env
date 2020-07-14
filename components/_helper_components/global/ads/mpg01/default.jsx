import React from 'react';
import PropTypes from 'prop-types';

const MPGO1Element = ({ adSlot, adCount, refHook }) => (
    <div ref={refHook} className="ad-mpg01-parent b-margin-bottom-5">
      {adSlot && adSlot(adCount)}
    </div>
);


MPGO1Element.propTypes = {
  adSlot: PropTypes.func,
  adCount: PropTypes.number,
  refHook: PropTypes.object,
};

export default MPGO1Element;
