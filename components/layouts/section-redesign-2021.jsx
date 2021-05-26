/*  /components/layouts/homepage-ten.jsx  */
import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import getQueryParams from './_helper_functions/getQueryParams';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import SectionHome from '../_helper_components/home/SectionHome/SectionHome';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import TopNavBreakingNews from '../_helper_components/global/navBar/TopNavBreakingNews/default';

const SectionRedesign2021 = (props) => {
  const [
    zone1,
    zone2,
    zone2rightrail,
    zone3,
    zone3rightrail,
    zone4,
    zone5,
    zone5rightrail,
    zone6,
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
      <main className="c-homepageContent">
        <SectionHome feature={zone1} />
        <SectionHome feature={zone2} rightRailContent={zone2rightrail} />
        <SectionHome feature={zone3} rightRailContent={zone3rightrail} />
        <SectionHome feature={zone4} />
        <SectionHome feature={zone5} rightRailContent={zone5rightrail} />
        <SectionHome feature={zone6} />
      </main>
      {!noHeaderAndFooter && <>
        <Footer />
        <Copyright />
      </>}
    </>
  );
};

SectionRedesign2021.sections = [
  'Zone 1',
  'Zone 2',
  'Right Rail (zone 2)',
  'Zone 3',
  'Right Rail (zone 3)',
  'Zone 4',
  'Zone 5',
  'Right Rail (zone 5)',
  'Zone 6',
];

SectionRedesign2021.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionRedesign2021;
