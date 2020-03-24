import React from 'react';
import PropTypes from 'prop-types';

const MPGO1Element = ({ adSlot, refHook }) => (
    <div id="ad-mpgo1-parent" ref={refHook} className="b-margin-bottom-5">
      {adSlot && adSlot()}
    </div>
);


MPGO1Element.propTypes = {
  adSlot: PropTypes.func,
  refHook: PropTypes.object,
};

export default MPGO1Element;
