/*  /components/layouts/section-special-seven.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import SectionOutput from '../_helper_components/section/SectionOutput';
import getQueryParams from './_helper_functions/getQueryParams';

const SectionLayout = (props) => {
  const [
    zone1,
    zone2Column1,
    zone2Column2,
    zone2Column3,
    zone3,
    zone4,
    zone4RightRail,
    zone5,
    zone6,
    zone6RightRail,
    zone7,
  ] = props.children;
  const appContext = useAppContext();
  const { layout, requestUri } = appContext;
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'wrap';
  const zonesCollection = [
    { content: zone1 },
    { content: [zone2Column1, zone2Column2, zone2Column3], colLayout: true },
    { content: zone3 },
    { content: zone4, rightRailZone: zone4RightRail },
    { content: zone5 },
    { content: zone6, rightRailZone: zone6RightRail },
    { content: zone7 },
  ];

  return <SectionOutput zones={zonesCollection} layout={layout} noHeaderAndFooter={noHeaderAndFooter}/>;
};

SectionLayout.sections = [
  'Zone 1',
  'Zone 2 (column 1)',
  'Zone 2 (column 2)',
  'Zone 2 (column 3)',
  'Zone 3',
  'Zone 4',
  'Right Rail (zone 4)',
  'Zone 5',
  'Zone 6',
  'Right Rail (zone 6)',
  'Zone 7',
];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
