import React from 'react';
import PropTypes from 'prop-types';

export const NoDFPIdSupplied = () => null;

export const PlaceholderAd = (props) => {
  const { classes } = props;

  const placeholderStyles = {
    background: 'teal',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  };

  return (
    <div className={`arc_ad | ${classes} placeholder text_align_center width_full`} style={placeholderStyles}>
      Advertisement
    </div>
  );
};

PlaceholderAd.propTypes = {
  adInfo: PropTypes.object,
  classes: PropTypes.string,
};
