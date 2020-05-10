/* eslint-disable no-unused-vars */
/*  /components/layouts/article-basic.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';

import GlobalAdSlots from '../_helper_components/global/ads/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import '../../src/styles/container/_homepage.scss';
import '../../src/styles/base/_utility.scss';

const HomePageLayout = () => {
  const appContext = useAppContext();
  const { layout } = appContext;

  const data = useContent({
    source: 'author-search',
  });

  return (
    <>
      <GlobalAdSlots />
      <BreakingNews />
      <NavBar type={layout} />
      <main className="c-homepageContent"></main>
      <Footer />
      <Copyright />
    </>
  );
};

export default HomePageLayout;
