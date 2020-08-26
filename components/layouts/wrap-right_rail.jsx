/*  /components/layouts/wrap-right_rail.jsx  */

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
  ] = props.children;
  const appContext = useAppContext();
  const { layout, requestUri } = appContext;
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'wrap';
  const zonesCollection = [
    { content: zone1 },
    { content: zone2, rightRailZone: zone2RightRail },
  ];

  return <SectionOutput zones={zonesCollection} layout={layout} noHeaderAndFooter={noHeaderAndFooter}/>;
};

SectionLayout.sections = [
  'Full Width (top ad)',
  'Wrap content',
  'Right Rail',
];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
