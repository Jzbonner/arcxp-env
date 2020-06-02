/*  /components/layouts/wrap-right_rail.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import SectionOutput from '../_helper_components/section/SectionOutput';

const SectionLayout = (props) => {
  const [
    zone1,
    zone1RightRail,
  ] = props.children;
  const appContext = useAppContext();
  const { layout } = appContext;
  const zonesCollection = [
    { content: zone1, rightRailZone: zone1RightRail },
  ];

  return <SectionOutput zones={zonesCollection} layout={layout} />;
};

SectionLayout.sections = [
  'Wrap content',
  'Right Rail',
];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
