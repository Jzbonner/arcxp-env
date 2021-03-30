import React from 'react';
import PropTypes from 'prop-types';

const SectionHomepage = ({
  feature, rightColContent, rightRailContent, colLayout, zoneOneRightRail = false,
}) => {
  if (feature || rightColContent || rightRailContent) {
    let parentClass = 'c-sectionHome ';
    if (rightColContent) {
      parentClass += ` halves ${rightRailContent ? ' with-rightRail' : ''}`;
    } else {
      parentClass += rightRailContent ? ' with-rightRail' : ' full-width';
    }
    if (colLayout) {
      parentClass += ' col-layout';
    }
    if (zoneOneRightRail) {
      parentClass += ' zone-one';
    }

    if (zoneOneRightRail) {
      return (
      <div className={parentClass}>
        <div className="c-contentElements">
          {!Array.isArray(feature) && feature}
          {Array.isArray(feature) && feature.map(feat => feat)}
          {rightRailContent && <div className='c-rightRail'>{rightRailContent}</div>}
        </div>
      </div>
      );
    }
    return (
      <div className={parentClass}>
        <div className="c-contentElements">
          {!Array.isArray(feature) && feature}
          {Array.isArray(feature) && feature.map(feat => feat)}
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
  colLayout: PropTypes.bool,
  zoneOneRightRail: PropTypes.bool,
};

export default SectionHomepage;
