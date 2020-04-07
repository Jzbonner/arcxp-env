import React from 'react';
import PropTypes from 'prop-types';

const SectionHomepage = ({ feature, rightColContent, rightRailContent }) => {
  if (feature || rightColContent || rightRailContent) {
    let parentClass = 'c-sectionHome b-margin-bottom-d40-m20 ';
    if (rightColContent) {
      parentClass += ' halves';
    } else {
      parentClass += rightRailContent ? ' with-rightRail' : ' full-width';
    }
    return (
      <div className={parentClass}>
        <div className="c-contentElements">
          {feature}
        </div>
        {rightColContent && <div className="c-contentElements">{rightColContent}</div>}
        {rightRailContent && <div className="c-rightRail">{rightRailContent}</div>}
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
