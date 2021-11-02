import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Overlay = ({ toggle, setToggle }) => {
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    } else if (!toggle) {
      document.body.style.overflow = 'initial';
      document.body.style.height = 'initial';
    }
  }, [toggle]);
  return (
    <div className={`b-overlay ${toggle ? 'isVisible' : ''}`} onClick={(e) => { e.preventDefault(); setToggle(false); }}></div>
  );
};

Overlay.propTypes = {
  toggle: PropTypes.bool,
  setToggle: PropTypes.func,
};
export default Overlay;
