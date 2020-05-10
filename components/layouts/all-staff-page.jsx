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
import AuthorMenu from '../_helper_components/authorpage/AuthorMenu/default';

import '../../src/styles/container/_all-staff.scss';
import '../../src/styles/base/_utility.scss';

// create memu element
// have it iterate over the object to create the menu
// clicking a menu item, sets it as active and takes you to a new url
// a resolver looks at the url
//    2. filters the authors

const HomePageLayout = () => {
  const appContext = useAppContext();
  const { layout } = appContext;

  const data = useContent({
    source: 'author-search',
  });

  return (
    <>
      <div className="author-menu-overlay"></div>
      <GlobalAdSlots />
      <BreakingNews />
      <NavBar type={layout} />
      <main className="c-homepageContent">
        <div className="c-sectionHome">
          <AuthorMenu />
        </div>
      </main>
      <Footer />
      <Copyright />
    </>
  );
};

export default HomePageLayout;
