import React from 'react';
import PropTypes from 'prop-types';

export const NoDFPIdSupplied = () => <div>No DFP Publisher ID has been supplied via site properties.</div>;

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
    <div className={`arc_ad | ${classes} placeholder text_align_center width_full b-margin-bottom-d40-m20`} style={placeholderStyles}>
      Advertisement
    </div>
  );
};

PlaceholderAd.propTypes = {
  adInfo: PropTypes.object,
  classes: PropTypes.string,
};
