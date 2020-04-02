import React from 'react';
import PropTypes from 'prop-types';

const SectionHomepage = ({ feature, rightColContent, rightRailContent }) => {
  if (feature || rightColContent || rightRailContent) {
    let parentClass = 'c-section c-sectionHome b-margin-bottom-d40-m20';
    parentClass += rightColContent ? 'halves' : '';
    parentClass += rightRailContent ? 'with-rightRail' : 'full-width';
    return (
      <div className={parentClass}>
        <div className="c-contentElements">
          {feature}
        </div>
        {rightRailContent && <div className="c-rightRail">{rightRailContent}</div>}
        {rightColContent && <div className="c-contentElements">{rightColContent}</div>}
      </div>
    );
  }
  return null;
};

SectionHomepage.propTypes = {
  feature: PropTypes.object,
  rightColContent: PropTypes.object,
  rightRailContent: PropTypes.object,
};

export default SectionHomepage;
