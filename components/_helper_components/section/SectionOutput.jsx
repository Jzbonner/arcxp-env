/*  /components/_helper_components/section/SectionOutput.jsx  */
import React from 'react';
import PropTypes from 'prop-types';
import GlobalAdSlots from '../global/ads/default';
import BreakingNews from '../global/breakingNews/default';
import NavBar from '../global/navBar/default';
import SectionHome from '../home/SectionHome/SectionHome';
import Footer from '../global/footer/default';
import Copyright from '../global/copyright/default';
import WeatherAlerts from '../global/weatherAlerts/default';
import '../../../src/styles/container/_c-section.scss';
import '../../../src/styles/base/_utility.scss';
import './default.scss';

const SectionOutput = ({ zones, layout }) => (
  <>
    <GlobalAdSlots pbPage={true} />
    <BreakingNews />
    <WeatherAlerts />
    <NavBar type={layout} />
    <main className="c-sectionContent">
      {zones && (
        zones.map((zone, i) => {
          const {
            content, rightRailZone, rightHalfZone, colLayout,
          } = zone;
          return <SectionHome feature={content}
          rightRailContent={rightRailZone}
          rightColContent={rightHalfZone}
          colLayout={colLayout}
          key={`section${i}`}/>;
        })
      )}
    </main>
    {layout !== 'wrap-header_only' && <>
      <Footer />
      <Copyright />
    </>}
  </>
);

SectionOutput.propTypes = {
  zones: PropTypes.array,
  layout: PropTypes.string,
};

export default SectionOutput;
