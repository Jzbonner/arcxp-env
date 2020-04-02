/*  /components/_helper_components/section/SectionOutput.jsx  */

import React from 'react';
import PropTypes from 'prop-types';

import GlobalAdSlots from '../global/ads/default';
import BreakingNews from '../global/breakingNews/default';
import NavBar from '../global/navBar/default';
import SectionHome from '../home/SectionHome/SectionHome';
import Footer from '../global/footer/default';
import '../../../src/styles/container/_section.scss';
import '../../../src/styles/base/_utility.scss';

const SectionOutput = ({ zones, layout }) => (
  <>
    <GlobalAdSlots />
    <BreakingNews />
    <NavBar type={layout} />
    <main className="c-sectionContent">
      {zones && (
        zones.map((zone, i) => {
          const { content, rightRailZone, rightHalfZone } = zone;
          return <SectionHome feature={content} rightRailContent={rightRailZone} rightColContent={rightHalfZone} key={`section${i}`}/>;
        })
      )}
    </main>
    <Footer />
  </>
);

SectionOutput.propTypes = {
  zones: PropTypes.array,
  layout: PropTypes.string,
};

export default SectionOutput;
