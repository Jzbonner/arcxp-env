import React, { useRef } from 'react';
import { useAppContext, useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import checkTags from './_helper_functions/checkTags';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import WeatherAlerts from '../_helper_components/global/weatherAlerts/default';
import ArcAd from '../features/ads/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import CollectionList from '../_helper_components/listpage/collectionList/default';
import '../features/List/default.scss';
import '../../src/styles/container/_homepage.scss';

const ListPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;
  if (!globalContent) return null;
  const { data, taxonomy } = globalContent || {};

  if (!data) return null;

  const { id: queryID, name, document } = data || {};

  const { content_elements: contentElements } = document;

  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');

  const displayClass = 'all';
  const displayClassesRequiringImg = ['all'];

  const initialList = useContent({
    source: 'collections-api',
    query: {
      id: queryID,
      from: 0,
      size: 10,
      arcSite,
      displayClass,
      displayClassesRequiringImg,
    },
  });

  const fetchRef = useRef(null);

  const RP01 = () => <ArcAd staticSlot={'RP01-List-Page'} key={'RP01-List-Page'} />;
  const MP05 = () => <ArcAd staticSlot={'MP05'} key={'MP05'} />;
  return (
    <>
      <GlobalAdSlots />
      <BreakingNews />
      <WeatherAlerts />
      <NavBar />
      <main className="c-listPage">
        <div className="c-section with-rightRail">
          <div className="c-contentElements list-contentElements">
            {!noAds ? <div className="c-rightRail list-rp01">{RP01()}</div> : null}
            <div className="b-flexCenter c-homeListContainer left-photo-display-class b-margin-bottom-d15-m10 one-column">
              <div className="b-flexCenter b-flexRow tease-listHeading b-margin-bottom-d30-m20" ref={fetchRef}>
                {name}
              </div>
              <CollectionList
                source={'collections-api'}
                listItems={initialList}
                collectionLength={contentElements ? contentElements.length : 0}
                collectionID={queryID}
                fetchRef={fetchRef}
              />
            </div>
          </div>
        </div>
        {!noAds ? <div className="list-mp05">{MP05()}</div> : null}
      </main>
      <Footer />
      <Copyright />
    </>
  );
};

ListPageLayout.sections = [];

export default ListPageLayout;
