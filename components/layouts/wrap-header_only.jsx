/*  /components/layouts/wrap-header_only.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import SectionOutput from '../_helper_components/section/SectionOutput';

const SectionLayout = () => {
  const appContext = useAppContext();
  const { layout } = appContext;
  return <SectionOutput zones={[]} layout={layout} />;
};

SectionLayout.sections = [];

export default SectionLayout;
