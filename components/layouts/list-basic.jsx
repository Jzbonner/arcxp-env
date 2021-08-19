import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import getQueryParams from './_helper_functions/getQueryParams';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import TopNavBreakingNews from '../_helper_components/global/navBar/TopNavBreakingNews/default';
import ListEnhanced from '../features/ListEnhanced/default';
import SectionHome from '../_helper_components/home/SectionHome/SectionHome';

const ListPageLayout = (props) => {
  const appContext = useAppContext();
  const {
    globalContent, requestUri,
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
      <main className="c-sectionCentered">
        <SectionHome feature={<ListEnhanced customFields={{ title, textBox }} />} />
      </main>
      {!noHeaderAndFooter && <>
        <Footer />
        <Copyright />
      </>}
    </>
  );
};

ListPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

ListPageLayout.sections = ['Title', 'Text Box'];

export default ListPageLayout;
