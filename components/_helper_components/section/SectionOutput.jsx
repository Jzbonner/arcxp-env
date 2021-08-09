/*  /components/_helper_components/section/SectionOutput.jsx  */
import React from 'react';
import PropTypes from 'prop-types';
import GlobalAdSlots from '../global/ads/default';
import SectionHome from '../home/SectionHome/SectionHome';
import Footer from '../global/footer/default';
import Copyright from '../global/copyright/default';
import TopNavBreakingNews from '../global/navBar/TopNavBreakingNews/default';
import '../../../src/styles/container/_c-section.scss';
import '../../../src/styles/base/_utility.scss';

const SectionOutput = ({
  zones,
  layout,
  noHeaderAndFooter,
  isSectionSpecialOne = false,
  isHtmlOutput,
}) => {
  const isErrorPage = layout === 'section-basic';
  const zonesOutput = () => zones && (
    zones.map((zone, i) => {
      const {
        content, rightRailZone, rightHalfZone, colLayout,
      } = zone;
      return <SectionHome feature={content}
      rightRailContent={rightRailZone}
      rightColContent={rightHalfZone}
      colLayout={colLayout}
      key={`section${i}`}
      isErrorPage={isErrorPage}/>;
    })
  );
  return (
    <>
      {!isHtmlOutput && <GlobalAdSlots pbPage={true} />}
      {/* we omit breaking news on wraps */}
      {!noHeaderAndFooter && !isHtmlOutput && <TopNavBreakingNews type={layout} omitBreakingNews={layout.indexOf('wrap-') !== -1} isSectionSpecialOne={isSectionSpecialOne} />}
      {!isHtmlOutput && <main className={`c-sectionContent ${isErrorPage ? 'b-contentMaxWidth' : ''}`}>
        {
          zonesOutput()
        }
      </main>}
      {isHtmlOutput && <>zonesOutput()</>}
      {layout !== 'wrap-header_only' && !noHeaderAndFooter && !isHtmlOutput && <>
        <Footer />
        <Copyright />
      </>}
    </>
  );
};

SectionOutput.propTypes = {
  zones: PropTypes.array,
  layout: PropTypes.string,
  noHeaderAndFooter: PropTypes.bool,
  isSectionSpecialOne: PropTypes.bool,
  isHtmlOutput: PropTypes.bool,
};

export default SectionOutput;
