import React from 'react';
import PropTypes from 'prop-types';
import ArcAdLib from './children/arcAdLib';

const AdSetup = ({
  customFields, breakpoints, dfpId, prerender, className, slotName, dimensions,
}) => {


  window.arcAdsPrerenderer = adDetails => new Promise((resolve) => {
    if (prerender) {
      prerender.adDetails();
    }
    resolve(adDetails);
  });

  const { id } = customFields;

  const instance = ArcAdLib.getInstance();
  if (instance) {
    instance.registerAd({
      id,
      slotName,
      dimensions,
      sizemap: {
        breakpoints,
      },
      dfpId,
      prerender: window.arcAdsPrerenderer,
    });
  }

  return (
    <div className={className}>
      <div id={id} className={`${slotName} arcad`}>{id}</div>
    </div>
  );
};

AdSetup.propTypes = {
  dfpId: PropTypes.number,
  breakpoints: PropTypes.array,
  prerender: PropTypes.func,
  className: PropTypes.string,
  dimensions: PropTypes.array,
  slotName: PropTypes.string,
  customFields: PropTypes.shape({
    id: PropTypes.oneOf(['HP01', 'RP09', 'PX01']).tag({
      label: 'Slot ID',
      description: 'Choose a Slot ID for your AD',
    }).isRequired,
  }),
};

AdSetup.defaultProps = {
  dimensions: [0, 0],
};

export default AdSetup;
