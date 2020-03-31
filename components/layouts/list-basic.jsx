import React from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import ArcAd from '../features/ads/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import CollectionList from '../_helper_components/listpage/collectionList/default';
import '../features/List/list.scss';
import collectionListFilter from '../../content/filters/collection-list';

const ListPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent, globalContentConfig } = appContext;
  if (!globalContent) return null;
  const {
    data,
  } = globalContent;

  const {
    query,
  } = globalContentConfig;

  const {
    id: queryID,
  } = query;

  const collection = useContent({
    source: 'content-api',
    query: {
      id: queryID,
    },
    filter: collectionListFilter,
  });

  const {
    content_elements: contentElements,
  } = collection;

  console.log(data);


  const RP01 = () => <ArcAd staticSlot={'RP01-List-Page'} key={'RP01-List-Page'} />;
  const MP05 = () => <ArcAd staticSlot={'MP05'} key={'MP05'} />;
  return (
    <>
      <GlobalAdSlots/>
      <BreakingNews/>
      <NavBar/>
      <main>
        <div className='c-section'>
          <div className='c-contentElements'>
            <div className='c-rightRail'>
              {RP01()}
              {MP05()}
            </div>
            <div className='c-homeListContainer b-margin-bottom-d15-m10 one-column left-photo-display-class'>
              <CollectionList listItems={data} collectionLength={contentElements.length} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
  </>
  );
};

export default ListPageLayout;
