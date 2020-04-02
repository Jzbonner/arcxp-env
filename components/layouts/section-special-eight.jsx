/*  /components/layouts/section-special-eight.jsx  */

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
    zone6,
    zone6RightRail,
    zone7,
    zone8,
    zone8RightRail,
  ] = props.children;
  const appContext = useAppContext();
  const { layout } = appContext;
  const zonesCollection = [
    { content: zone1 },
    { content: zone2, rightRailZone: zone2RightRail },
    { content: zone3 },
    { content: zone4, rightRailZone: zone4RightRail },
    { content: zone5 },
    { content: zone6, rightRailZone: zone6RightRail },
    { content: zone7 },
    { content: zone8, rightRailZone: zone8RightRail },
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
  'Zone 6',
  'Right Rail (zone 6)',
  'Zone 7',
  'Zone 8',
  'Right Rail (zone 8)',
];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
