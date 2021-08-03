import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import getQueryParams from './_helper_functions/getQueryParams';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import SearchPage from '../_helper_components/searchPage/default';
import TopNavBreakingNews from '../_helper_components/global/navBar/TopNavBreakingNews/default';

const SearchPageLayout = (props) => {
  const appContext = useAppContext();
  const {
    globalContent, globalContentConfig, requestUri,
  } = appContext;
  if (!globalContent) return null;
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'wrap';

  const [title, textBox] = props.children;

  return (
    <>
      <GlobalAdSlots />
      {!noHeaderAndFooter && <TopNavBreakingNews />}
      <SearchPage
        globalContent={globalContent}
        globalContentConfig={globalContentConfig}
        title={title}
        textBox={textBox}
      />
      {!noHeaderAndFooter && <>
        <Footer />
        <Copyright />
      </>}
    </>
  );
};

SearchPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

SearchPageLayout.sections = ['Title', 'Text Box'];

export default SearchPageLayout;
