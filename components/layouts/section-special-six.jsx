/*  /components/layouts/section-special-six.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import SectionOutput from '../_helper_components/section/SectionOutput';
import getQueryParams from './_helper_functions/getQueryParams';

const SectionLayout = (props) => {
  const [
    zone1,
    zone2Left,
    zone2Right,
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
  const { layout, requestUri } = appContext;
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'wrap';
  const zonesCollection = [
    { content: zone1 },
    { content: zone2Left, rightHalfZone: zone2Right, rightRailZone: zone2RightRail },
    { content: zone3Left, rightHalfZone: zone3Right, rightRailZone: zone3RightRail },
    { content: zone4 },
    { content: zone5, rightRailZone: zone5RightRail },
    { content: zone6 },
  ];

  return <SectionOutput zones={zonesCollection} layout={layout} noHeaderAndFooter={noHeaderAndFooter}/>;
};

SectionLayout.sections = [
  'Zone 1',
  'Left Col (zone 2)',
  'Right Col (zone 2)',
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
