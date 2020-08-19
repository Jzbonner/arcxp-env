/*  /components/layouts/section-special-six-two-col.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import SectionOutput from '../_helper_components/section/SectionOutput';

const SectionLayout = (props) => {
  const [
    zone1,
    zone2,
    zone2RightRail,
    zone3Left,
    zone3Right,
    zone3RightRail,
    zone4,
    zone5,
    zone5RightRail,
    zone6,
  ] = props.children;
  const appContext = useAppContext();
  const { layout } = appContext;
  const zonesCollection = [
    { content: zone1 },
    { content: zone2, rightRailZone: zone2RightRail },
    { content: zone3Left, rightHalfZone: zone3Right, rightRailZone: zone3RightRail },
    { content: zone4 },
    { content: zone5, rightRailZone: zone5RightRail },
    { content: zone6 },
  ];

  return <SectionOutput zones={zonesCollection} layout={layout} />;
};

SectionLayout.sections = [
  'Zone 1',
  'Zone 2',
  'Right Rail (zone 2)',
  'Left Col (zone 3)',
  'Right Col (zone 3)',
  'Right Rail (zone 3)',
  'Zone 4',
  'Zone 5',
  'Right Rail (zone 5)',
  'Zone 6',
];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
