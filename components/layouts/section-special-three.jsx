/*  /components/layouts/section-special-three.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import SectionOutput from '../_helper_components/section/SectionOutput';

const SectionLayout = (props) => {
  const [
    zone1,
    zone2,
    zone2RightRail,
    zone3,
  ] = props.children;
  const appContext = useAppContext();
  const { layout } = appContext;
  const zonesCollection = [
    { content: zone1 },
    { content: zone2, rightRailZone: zone2RightRail },
    { content: zone3 },
  ];

  return <SectionOutput zones={zonesCollection} layout={layout} />;
};

SectionLayout.sections = [
  'Zone 1',
  'Zone 2',
  'Right Rail (zone 2)',
  'Zone 3',
];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
