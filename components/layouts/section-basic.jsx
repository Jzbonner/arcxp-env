/*  /components/layouts/section-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';

import GlobalAdSlots from '../_helper_components/global/ads/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import NavBar from '../_helper_components/global/navBar/default';
import SectionHome from '../_helper_components/home/SectionHome/SectionHome';
import Footer from '../_helper_components/global/footer/default';
import '../../src/styles/container/_section.scss';
import '../../src/styles/base/_utility.scss';

const SectionLayout = (props) => {
  const [
    zone1,
    zone2,
    zone2RightRail,
    zone3,
    zone4,
    zone4RightRail,
    zone5,
  ] = props.children;
  const appContext = useAppContext();
  const { layout } = appContext;

  return (
    <>
      <GlobalAdSlots />
      <BreakingNews />
      <NavBar type={layout} />
      <main className="c-sectionContent">
        <SectionHome feature={zone1} />
        <SectionHome feature={zone2} rightRailContent={zone2RightRail} />
        <SectionHome feature={zone3} />
        <SectionHome feature={zone4} rightRailContent={zone4RightRail} />
        <SectionHome feature={zone5} />
      </main>
      <Footer />
    </>
  );
};

SectionLayout.sections = [
  'Zone 1',
  'Zone 2',
  'Right Rail (zone 2)',
  'Zone 3',
  'Zone 4',
  'Right Rail (zone 4)',
  'Zone 5',
];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
