import React from 'react';
import { useAppContext } from 'fusion:context';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import ArcAd from '../features/ads/default';
import Headline from '../_helper_components/article/headline/default.jsx';
import Gallery from '../features/gallery/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import checkTags from './_helper_functions/checkTags';
import getGalleryTopics from './_helper_functions/getGalleryTopics';
import getQueryParams from './_helper_functions/getQueryParams';
import TopNavBreakingNews from '../_helper_components/global/navBar/TopNavBreakingNews/default';

const GalleryPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent, requestUri } = appContext;
  if (!globalContent) return null;

  const {
    content_elements: contentElements,
    headlines,
    comments,
    canonical_url: articleURL,
    type,
    subtype,
    credits,
    description,
    streams,
    promo_items: promoItems,
    taxonomy,
  } = globalContent || {};
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'wrap';

  const galleryTopics = getGalleryTopics(promoItems, taxonomy);

  const { basic } = promoItems || {};
  const { basic: leafHeadline } = headlines || {};

  const basicItems = {
    type,
    credits,
    description,
    streams,
  };
  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');

  return (
    <>
      {!noAds && <GlobalAdSlots galleryTopics={galleryTopics} />}
      {!noHeaderAndFooter && (
        <TopNavBreakingNews
          articleURL={articleURL}
          headlines={headlines}
          comments={comments}
          type={type}
          noAds={noAds}
          galleryTopics={galleryTopics} />
      )}
      <main>
        {!noAds && <div className="c-hp01-mp01 b-margin-top-d40-m20">
          <ArcAd staticSlot={'HP00'} galleryTopics={galleryTopics} />
          <ArcAd staticSlot={'MP01'} galleryTopics={galleryTopics} />
        </div>}
        <div className="c-header-gallery">
          <Headline headlines={headlines} basicItems={basicItems} />
        </div>
        <div className="c-main-gallery">
          <Gallery
            leafContentElements={contentElements}
            promoItems={basic}
            pageType={subtype}
            leafHeadline={leafHeadline}
            taxonomy={taxonomy}
          />
        </div>
      </main>
      {!noHeaderAndFooter && <>
      <Footer />
      <Copyright />
      </>}
    </>
  );
};

GalleryPageLayout.sections = [];

export default GalleryPageLayout;
