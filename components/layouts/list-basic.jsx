import React from 'react';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import ArcAd from '../features/ads/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
// import Section from '../_helper_components/article/section/Section';
import ListItem from '../_helper_components/home/ListItem/ListItem';
import '../features/List/list.scss';

const ListPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  if (!globalContent) return null;
  const {
    content_elements: contentElements,
  } = globalContent;

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
              {contentElements.map((el, i) => <ListItem key={`ListItem-${i}`} {...el} />)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
  </>
  );
};

export default ListPageLayout;
