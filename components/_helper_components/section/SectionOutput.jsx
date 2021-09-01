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
}) => {
  const isErrorPage = layout === 'section-basic';
  return (
    <>
      {<GlobalAdSlots pbPage={true} />}
      {/* we omit breaking news on wraps */}
      {!noHeaderAndFooter && <TopNavBreakingNews type={layout} omitBreakingNews={layout.indexOf('wrap-') !== -1} />}
      {<main className={`c-sectionContent ${isErrorPage ? 'b-contentMaxWidth' : ''}`}>
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
      </main>}
      {layout !== 'wrap-header_only' && !noHeaderAndFooter && <>
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
};

export default SectionOutput;
