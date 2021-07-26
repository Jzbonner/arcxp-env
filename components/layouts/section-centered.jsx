/*  /components/layouts/section-centered.jsx  */
import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import getQueryParams from './_helper_functions/getQueryParams';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import SectionHome from '../_helper_components/home/SectionHome/SectionHome';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import TopNavBreakingNews from '../_helper_components/global/navBar/TopNavBreakingNews/default';

const HomePageLayout = (props) => {
  const [
    zone1,
    zone2,
    zone3,
  ] = props.children;
  const appContext = useAppContext();
  const { layout, requestUri } = appContext;
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'wrap';

  return (
    <>
      <GlobalAdSlots pbPage={true} />
      {!noHeaderAndFooter && <TopNavBreakingNews type={layout} />}
      <main className="c-sectionCentered">
        <SectionHome feature={zone1} />
        <SectionHome feature={zone2} />
        <SectionHome feature={zone3} />
      </main>
      {!noHeaderAndFooter && <>
        <Footer />
        <Copyright />
      </>}
    </>
  );
};

HomePageLayout.sections = [
  'Content Area 1',
  'Content Area 2',
  'Content Area 3',
];

HomePageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomePageLayout;
