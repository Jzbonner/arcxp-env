/*  /components/_helper_components/section/SectionOutput.jsx  */
import React from 'react';
import PropTypes from 'prop-types';
import GlobalAdSlots from '../global/ads/default';
import SectionHome from '../home/SectionHome/SectionHome';
import Footer from '../global/footer/default';
import Copyright from '../global/copyright/default';
import TopNavBreakingNews from '../global/navBar/TopNavBreakingNews/default';
import getContentMeta from '../global/siteMeta/_helper_functions/getContentMeta';
import '../../../src/styles/container/_c-section.scss';
import '../../../src/styles/base/_utility.scss';

const SectionOutput = ({
  zones,
  layout,
  noHeaderAndFooter,
}) => {
  const { pageIsLive, paywallStatus } = getContentMeta();
  const isMeteredStory = paywallStatus === 'premium';
  // if the `live` meta exists, we set the default class to `not-live`
  let liveIndicatorClass = pageIsLive ? 'is-live' : 'not-live';
  // then, if the `live` meta exists and is actually live, we re-set it to `is-live`
  if (pageIsLive === 'true' || pageIsLive === 'yes') {
    liveIndicatorClass = 'is-live';
  }
  const isErrorPage = layout === 'section-basic';
  return (
    <>
      {<GlobalAdSlots pbPage={true} lazyLoad={isMeteredStory} />}
      {/* we omit breaking news on wraps */}
      {!noHeaderAndFooter && <TopNavBreakingNews type={layout} omitBreakingNews={layout.indexOf('wrap-') !== -1} />}
      {<main className={`c-sectionContent ${isErrorPage ? 'b-contentMaxWidth' : ''} ${liveIndicatorClass}`}>
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
              isErrorPage={isErrorPage} />;
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
