/*  /components/layouts/section-special-three.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import SectionOutput from '../_helper_components/section/SectionOutput';
import getQueryParams from './_helper_functions/getQueryParams';

const SectionLayout = (props) => {
  const [
    zone1,
    zone2,
    zone2RightRail,
    zone3,
  ] = props.children;
  const appContext = useAppContext();
  const { layout, requestUri } = appContext;
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'wrap';
  const zonesCollection = [
    { content: zone1 },
    { content: zone2, rightRailZone: zone2RightRail },
    { content: zone3 },
  ];

  return <SectionOutput zones={zonesCollection} layout={layout} noHeaderAndFooter={noHeaderAndFooter}/>;
};

SectionLayout.sections = [
  'Content Area 1',
  'Content Area 2',
  'Content Area - Right Rail',
  'Content Area 3',
];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
