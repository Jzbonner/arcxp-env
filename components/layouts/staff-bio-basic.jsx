import React, { useRef } from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import checkTags from './_helper_functions/checkTags';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import ArcAd from '../features/ads/default';
import StaffBio from '../_helper_components/staffBioPage/staffBio/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import CollectionList from '../_helper_components/staffBioPage/collectionList/default';
import getQueryParams from './_helper_functions/getQueryParams';
import '../features/List/default.scss';
import '../_helper_components/listpage/default.scss';
import TopNavBreakingNews from '../_helper_components/global/navBar/TopNavBreakingNews/default';

const staffBioPage = () => {
  const appContext = useAppContext();
  const { globalContent, requestUri } = appContext;

  if (!globalContent) return null;
  const {
    _id: queryID,
    role,
    image: authorPhoto,
    byline,
    longBio,
    twitter,
    facebook,
    expertise,
    taxonomy,
    email,
    custom_ajc_phone: phoneNumber,
  } = globalContent || {};
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'wrap';


  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');

  const initialList = useContent({
    source: 'author-stories-list',
    query: {
      id: queryID,
      from: 0,
    },
  });

  const {
    content_elements: listItems,
    count,
  } = initialList || {};

  const fetchRef = useRef(null);

  const RP01 = () => <ArcAd staticSlot={'RP01 sticky'} key={'RP01 sticky'} />;
  const MP05 = () => <ArcAd staticSlot={'MP05'} key={'MP05'} />;
  return (
    <>
      <GlobalAdSlots/>
      {!noHeaderAndFooter && <TopNavBreakingNews />}
      <main className='c-staffBioPage b-contentMaxWidth b-sectionHome-padding'>
          {!noAds
          && <div className="c-hp01-mp01">
              <ArcAd staticSlot={'HP01'} />
              <ArcAd staticSlot={'MP01'} />
            </div>}
        <div className='c-section with-rightRail'>
        <StaffBio role={role}
        authorPhoto={authorPhoto}
        byline={byline}
        longBio={longBio}
        twitter={twitter}
        facebook={facebook}
        expertise={expertise}
        email={email}
        phoneNumber={phoneNumber}/>
          <div className='c-contentElements list-contentElements'>
            { !noAds ? <div className='c-rightRail list-rp01'>
              {RP01()}
            </div> : null }
            <div className='b-flexCenter c-homeListContainer left-photo-display-class b-margin-bottom-d15-m10 one-column'>
              <div className='b-flexRow tease-listHeading b-margin-bottom-d30-m20' ref={fetchRef}>Latest from {byline}</div>
              <CollectionList source={'author-stories-list'}
              listItems={listItems}
              collectionLength={count}
              collectionID={queryID}
              fetchRef={fetchRef} />
            </div>
          </div>
        </div>
        { !noAds ? <div className='list-mp05'>{MP05()}</div> : null}
      </main>
      {!noHeaderAndFooter && <>
      <Footer />
      <Copyright />
      </>}
  </>
  );
};

staffBioPage.sections = [];

export default staffBioPage;
