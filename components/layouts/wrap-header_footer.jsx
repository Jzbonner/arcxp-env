/*  /components/layouts/wrap-header_footer.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import SectionOutput from '../_helper_components/section/SectionOutput';
import getQueryParams from './_helper_functions/getQueryParams';

const SectionLayout = (props) => {
  const [zone1] = props.children;
  const appContext = useAppContext();
  const { layout, requestUri } = appContext;
  const zonesCollection = [{ content: zone1 }];
  const queryParams = getQueryParams(requestUri);
  const { nowrap: detectNoWrap } = queryParams || {};
  const noHeaderAndFooter = detectNoWrap && detectNoWrap === 'y';

  return <SectionOutput zones={zonesCollection} layout={layout} noHeaderAndFooter={noHeaderAndFooter}/>;
};

SectionLayout.sections = ['Wrap content'];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
