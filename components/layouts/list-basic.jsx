import React from 'react';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import WeatherAlerts from '../_helper_components/global/weatherAlerts/default';

import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import ListPage from '../_helper_components/listpage/default';
import '../../src/styles/container/_homepage.scss';

const ListPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent, globalContentConfig } = appContext;
  if (!globalContent) return null;

  return (
    <>
      <GlobalAdSlots />
      <BreakingNews />
      <WeatherAlerts />
      <NavBar />
      <ListPage
        globalContent={globalContent}
        globalContentConfig={globalContentConfig}
      />
      <Footer />
      <Copyright />
    </>
  );
};

ListPageLayout.sections = [];

export default ListPageLayout;
