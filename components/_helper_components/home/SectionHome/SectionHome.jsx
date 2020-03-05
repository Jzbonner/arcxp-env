import React from 'react';
import PropTypes from 'prop-types';

const SectionHomepage = ({ feature, rightRailAd }) => {
  if (feature) {
    return (
      <div className={`c-section ${rightRailAd ? 'with-rightRail' : ''} b-margin-bottom-d40-m20`}>
        <div className="c-contentElements">
          {rightRailAd && <div className="c-rightRail">{rightRailAd()}</div>}
          {feature}
        </div>
      </div>
    );
  }
  return null;
};

SectionHomepage.propTypes = {
  feature: PropTypes.object,
  rightRailAd: PropTypes.func,
};

export default SectionHomepage;
