import React from 'react';
import PropTypes from 'prop-types';

const SectionHomepage = ({ feature, rightRailContent }) => {
  if (feature || rightRailContent) {
    return (
      <div className={`c-sectionHome ${rightRailContent ? 'with-rightRail' : 'full-width'} b-margin-bottom-d40-m20`}>
        <div className="c-contentElements">
          {feature}
        </div>
        {rightRailContent && <div className="c-rightRail">{rightRailContent}</div>}
      </div>
    );
  }
  return null;
};

SectionHomepage.propTypes = {
  feature: PropTypes.object,
  rightRailContent: PropTypes.object,
};

export default SectionHomepage;
