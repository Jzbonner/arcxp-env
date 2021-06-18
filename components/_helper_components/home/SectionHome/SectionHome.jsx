import React from 'react';
import PropTypes from 'prop-types';

const SectionHomepage = ({
  feature, rightColContent, rightRailContent, colLayout, isErrorPage,
}) => {
  if (feature || rightColContent || rightRailContent) {
    let parentClass = 'c-sectionHome b-sectionHome-padding b-sectionHomeMaxWidth';
    if (rightColContent) {
      parentClass += ` halves ${rightRailContent ? ' with-rightRail' : ''}`;
    } else {
      parentClass += rightRailContent ? ' with-rightRail' : ' full-width';
    }
    if (colLayout) {
      parentClass += ' col-layout';
    }

    return (
      <div className={parentClass}>
        <div className="c-contentElements">
          {!Array.isArray(feature) && feature}
          {Array.isArray(feature) && feature.map(feat => feat)}
        </div>
        {rightColContent && <div className="c-contentElements">{rightColContent}</div>}
        {rightRailContent && <div className={`c-rightRail ${isErrorPage ? 'c-RightRailWithErrorPageFeature' : ''}`}>{rightRailContent}</div>}
      </div>
    );
  }
  return null;
};

SectionHomepage.propTypes = {
  feature: PropTypes.object,
  rightColContent: PropTypes.object,
  rightRailContent: PropTypes.object,
  colLayout: PropTypes.bool,
  isErrorPage: PropTypes.bool,
};

export default SectionHomepage;
