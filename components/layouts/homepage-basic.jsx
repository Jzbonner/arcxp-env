/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';

import GlobalAdSlots from '../_helper_components/global/ads/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import NavBar from '../_helper_components/global/navBar/default';
import SectionHome from '../_helper_components/home/SectionHome/SectionHome';
import Footer from '../_helper_components/global/footer/default';

const HomePageLayout = (props) => {
  const [zone1, zone2, zone3, zone4, zone5, zone6] = props.children;
  const appContext = useAppContext();
  const { layout } = appContext;
  const Ad = () => <div>Placeholder Ad</div>;

  return (
    <>
      <GlobalAdSlots />
      <BreakingNews />
      <NavBar type={layout} />
      <main className="c-homepageContent">
        <SectionHome feature={zone1} rightRailAd={Ad} />
        <SectionHome feature={zone2} />
        <SectionHome feature={zone3} rightRailAd={Ad} />
        <SectionHome feature={zone4} />
        <SectionHome feature={zone5} rightRailAd={Ad} />
        <SectionHome feature={zone6} />
      </main>
      <Footer />
    </>
  );
};

HomePageLayout.sections = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6'];

HomePageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomePageLayout;
