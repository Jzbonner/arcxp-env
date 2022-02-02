/*  /components/layouts/homepage-nine.jsx  */
import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import getQueryParams from './_helper_functions/getQueryParams';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import SectionHome from '../_helper_components/home/SectionHome/SectionHome';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import TopNavBreakingNews from '../_helper_components/global/navBar/TopNavBreakingNews/default';

const HomePageNineLayout = (props) => {
  const [
    zone1,
    zone1rightrail,
    zone2,
    zone2rightrail,
    zone3,
    zone4,
    zone4rightrail,
    zone5,
    zone6,
    zone6rightrail,
    zone7,
    zone8,
    zone8rightrail,
    zone9,
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
        <SectionHome feature={zone1} rightRailContent={zone1rightrail} />
        <SectionHome feature={zone2} rightRailContent={zone2rightrail} />
        <SectionHome feature={zone3} />
        <SectionHome feature={zone4} rightRailContent={zone4rightrail} />
        <SectionHome feature={zone5} />
        <SectionHome feature={zone6} rightRailContent={zone6rightrail} />
        <SectionHome feature={zone7} />
        <SectionHome feature={zone8} rightRailContent={zone8rightrail} />
        <SectionHome feature={zone9} />
      </main>
      {!noHeaderAndFooter && <>
        <Footer />
        <Copyright />
      </>}
    </>
  );
};

HomePageNineLayout.sections = [
  'Zone 1',
  'Right Rail (zone 1)',
  'Zone 2',
  'Right Rail (zone 2)',
  'Zone 3',
  'Zone 4',
  'Right Rail (zone 4)',
  'Zone 5',
  'Zone 6',
  'Right Rail (zone 6)',
  'Zone 7',
  'Zone 8',
  'Right Rail (zone 8)',
  'Zone 9',
];

HomePageNineLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomePageNineLayout;
