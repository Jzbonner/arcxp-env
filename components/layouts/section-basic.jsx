/*  /components/layouts/section-basic.jsx  */

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
    zone4,
    zone4RightRail,
    zone5,
  ] = props.children;
  const appContext = useAppContext();
  const { layout } = appContext;
  const zonesCollection = [
    { content: zone1 },
    { content: zone2, rightRailZone: zone2RightRail },
    { content: zone3 },
    { content: zone4, rightRailZone: zone4RightRail },
    { content: zone5 },
  ];

  return <SectionOutput zones={zonesCollection} layout={layout} />;
};

SectionLayout.sections = [
  'Zone 1',
  'Zone 2',
  'Right Rail (zone 2)',
  'Zone 3',
  'Zone 4',
  'Right Rail (zone 4)',
  'Zone 5',
];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
