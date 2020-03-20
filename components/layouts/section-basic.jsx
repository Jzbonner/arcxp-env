/*  /components/layouts/section-basic.jsx  */

import React from 'react';
import PropTypes from 'prop-types';

import GlobalAdSlots from '../_helper_components/global/ads/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import NavBar from '../_helper_components/global/navBar/default';
import SectionHome from '../_helper_components/home/SectionHome/SectionHome';
import Footer from '../_helper_components/global/footer/default';

const SectionLayout = (props) => {
  const [zone1, zone2, zone3, zone4, zone5] = props.children;

  const Ad = () => <div>Placeholder Ad</div>;

  return (
    <>
      <GlobalAdSlots />
      <BreakingNews />
      <NavBar />
      <main className="c-sectionContent">
        <SectionHome feature={zone1} />
        <SectionHome feature={zone2} rightRailAd={Ad} />
        <SectionHome feature={zone3} />
        <SectionHome feature={zone4} rightRailAd={Ad} />
        <SectionHome feature={zone5} />
      </main>
      <Footer />
    </>
  );
};

SectionLayout.sections = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'];

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
