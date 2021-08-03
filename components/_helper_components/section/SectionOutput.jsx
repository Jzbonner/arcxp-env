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
<<<<<<< HEAD
    {!noHeaderAndFooter && <TopNavBreakingNews type={layout} omitBreakingNews={layout.indexOf('wrap-') !== -1} isSectionSpecialOne={isSectionSpecialOne} />}
    <main className={`c-sectionContent ${isErrorPage ? 'b-contentMaxWidth' : ''}`}>
      {zones && (
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
      )}
    </main>
    {layout !== 'wrap-header_only' && <>
    {!noHeaderAndFooter && <>
=======
    {!noHeaderAndFooter && !isHtmlOutput && <TopNavBreakingNews type={layout} omitBreakingNews={layout.indexOf('wrap-') !== -1} />}
    {!isHtmlOutput && <main className={`c-sectionContent ${isErrorPage ? 'b-contentMaxWidth' : ''}`}>
      zonesOutput();
    </main>}
    {isHtmlOutput && zonesOutput()}
    {layout !== 'wrap-header_only' && !noHeaderAndFooter && !isHtmlOutput && <>
>>>>>>> 5e0e970c... [APD-1441] adding support for html to remove nav/footer/etc
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
<<<<<<< HEAD
  isSectionSpecialOne: PropTypes.bool,
=======
  isHtmlOutput: PropTypes.bool,
>>>>>>> 5e0e970c... [APD-1441] adding support for html to remove nav/footer/etc
};

export default SectionOutput;
