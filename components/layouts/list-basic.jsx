import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import WeatherAlerts from '../_helper_components/global/weatherAlerts/default';

import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import ListPage from '../_helper_components/listpage/default';
import '../../src/styles/container/_homepage.scss';

const ListPageLayout = (props) => {
  const appContext = useAppContext();
  const { globalContent, globalContentConfig, renderables } = appContext;
  if (!globalContent) return null;

  const [title] = props.children;
  const pageTitleFeaturePresent = renderables[2] && renderables[2].type === 'pageTitle/default';

  return (
    <>
      <GlobalAdSlots />
      <BreakingNews />
      <WeatherAlerts />
      <NavBar />
      <ListPage
        globalContent={globalContent}
        globalContentConfig={globalContentConfig}
        title={pageTitleFeaturePresent && title}
      />
      <Footer />
      <Copyright />
    </>
  );
};

ListPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

ListPageLayout.sections = ['Title'];

export default ListPageLayout;
