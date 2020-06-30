/*  /components/layouts/wrap-header_only.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import SectionOutput from '../_helper_components/section/SectionOutput';

const SectionLayout = (props) => {
  const [zone1] = props.children;
  const appContext = useAppContext();
  const { layout } = appContext;
  const zonesCollection = [{ content: zone1 }];

  return <SectionOutput zones={zonesCollection} layout={layout} />;
};

SectionLayout.sections = ['Wrap content'];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
