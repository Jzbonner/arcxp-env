import React from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import ArcAd from '../features/ads/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import CollectionList from '../_helper_components/listpage/collectionList/default';
import collectionListFilter from '../../content/filters/collection-list';
import '../features/List/default.scss';
import '../../src/styles/container/_homepage.scss';

const ListPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  if (!globalContent) return null;
  const {
    _id: queryID,
    content_elements: data,
    taxonomy,
  } = globalContent;
  console.log(globalContent);

  const { tags = [] } = taxonomy || {};


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

  const noAds = tags.some(tag => tag && tag.text && tag.text.toLowerCase() === 'no-ads');

  const RP01 = () => <ArcAd staticSlot={'RP01-List-Page'} key={'RP01-List-Page'} />;
  const MP05 = () => <ArcAd staticSlot={'MP05'} key={'MP05'} />;
  return (
    <>
      <GlobalAdSlots/>
      <BreakingNews/>
      <NavBar/>
      <main className='c-listPage'>
        <div className='c-section'>
          <div className='c-contentElements'>
            { !noAds ? <div className='c-rightRail'>
              {RP01()}
            </div> : null }
            <div className='b-flexCenter c-homeListContainer b-margin-bottom-d15-m10 one-column left-photo-display-class'>
              <div className='b-flexCenter b-flexRow tease-listHeading b-margin-bottom-d30-m20'>List Page</div>
              <CollectionList listItems={data} collectionLength={contentElements.length} collectionID={queryID} />
            </div>
          </div>
        </div>
        { !noAds ? <div>{MP05()}</div> : null}
      </main>
      <Footer />
  </>
  );
};

export default ListPageLayout;
