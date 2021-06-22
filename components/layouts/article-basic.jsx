/*  /components/layouts/article-basic.jsx  */
import React from 'react';
import { useAppContext, useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import fetchEnv from '../_helper_components/global/utils/environment';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import TimeStamp from '../_helper_components/article/timestamp/default.jsx';
import Byline from '../_helper_components/article/byline/default.jsx';
import SocialShare from '../_helper_components/article/socialShare/amp.jsx';
import Headline from '../_helper_components/article/headline/default.jsx';
import SubHeadline from '../_helper_components/article/subheadline/default.jsx';
import SectionLabel from '../_helper_components/global/sectionLabel/default.jsx';
import Section from '../_helper_components/article/section/Section';
import TaboolaFeed from '../features/taboolaFeed/default';
import Nativo from '../_helper_components/article/nativo/nativo.jsx';
import BlogAuthor from '../_helper_components/article/blogAuthor/BlogAuthor';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import ArcAd from '../features/ads/default';
import ContributorBadge from '../_helper_components/global/contributorBadge/default';
import filterContentElements from './_helper_functions/article/filterContentElements';
import { ConnextAuthTrigger } from '../_helper_components/global/connext/default';
import ConnextEndOfStory from '../_helper_components/global/connextEndOfStory/default';
import ConnextHyperLocalSubscription from '../_helper_components/global/ConnextHyperLocalSubscription/ConnextHyperLocalSubscription';
import FlatPage from '../_helper_components/flatpage/default';
import ConnextInlinePromoSubscription from '../_helper_components/global/connextInlinePromo/default';
import getQueryParams from './_helper_functions/getQueryParams';
import checkTags from './_helper_functions/checkTags';
import checkSponsor from './_helper_functions/checkSponsor';
import getSponsorData from './_helper_functions/getSponsorData';
import AmpAd from '../_helper_components/amp/amp-ads/AmpAd';
import Carousel from '../_helper_components/article/carousel/default';
import SponsorBanner from '../_helper_components/article/sponsorBanner/default';
import SponsorRelatedBox from '../_helper_components/article/sponsorRelatedBox/default';
import InterscrollerPlaceholder from '../_helper_components/article/interscroller/default';
import SponsorStoryMessage from '../_helper_components/article/sponsorStoryMessage/default';
import { paragraphCounter, isParagraph } from './_helper_functions/Paragraph';
import TopNavBreakingNews from '../_helper_components/global/navBar/TopNavBreakingNews/default';
import RelatedList from '../_helper_components/article/relatedList/default';
import ConnextThankYouMessage from '../_helper_components/global/ConnextThankYouMessage/amp';
import NonSubPremiumMessage from '../_helper_components/amp/nonSubPremiumMessage/default';
import PaywallLimitMessage from '../_helper_components/amp/paywallLimitMessage/default';
import SponsorRelatedBoxAMP from '../_helper_components/article/sponsorRelatedBox/amp';
import PartnerBadge from '../_helper_components/article/partnerBadge/default';

const start = 3;

const StoryPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent, requestUri } = appContext;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext, siteFullname } = getProperties(arcSite);
  const { allowMeter = false } = connext[currentEnv] || {};

  if (!globalContent) return null;
  const {
    _id: uuid,
    first_publish_date: firstPublishDate,
    display_date: displayDate,
    content_elements: contentElements,
    promo_items: promoItems,
    subtype,
    headlines,
    label,
    comments,
    taxonomy,
    canonical_url: articleURL,
    subheadlines,
    credits,
    type,
    content_restrictions: contentRestrictions,
  } = globalContent || {};
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';
  const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'wrap';
  if (subtype === 'Flatpage') return <FlatPage globalContent={globalContent} noHeaderAndFooter={noHeaderAndFooter} />;

  const { by: authorData } = credits || {};
  const { basic: basicItems } = promoItems || {};
  const { type: promoType = '' } = basicItems || {};
  const { content_code: paywallStatus } = contentRestrictions || {};
  const isMeteredStory = allowMeter
    && paywallStatus
    && paywallStatus.toLowerCase() !== 'free'
    && paywallStatus.toLowerCase() !== 'unmetered';

  const ampMP02 = () => <AmpAd adSlot="MP02" uuid={uuid} width={'300'} height={'250'} taxonomy={taxonomy} componentName={'ArcAd'} isMeteredStory={isMeteredStory} />;
  const ampMP03 = () => <AmpAd adSlot="MP03" uuid={uuid} width={'300'} height={'250'} taxonomy={taxonomy} componentName={'ArcAd'} isMeteredStory={isMeteredStory} />;
  const RP01StoryDesktop = () => <ArcAd staticSlot={'RP01-Story-Desktop'} lazyLoad={isMeteredStory} key={'RP01-Story-Desktop'} />;
  const RP01StoryTablet = () => <ArcAd staticSlot={'RP01-Story-Tablet'} lazyLoad={isMeteredStory} key={'RP01-Story-Tablet'} />;
  const MP02 = () => <ArcAd staticSlot={'MP02'} lazyLoad={isMeteredStory} key={'MP02'} />;
  const MP03 = () => <ArcAd staticSlot={'MP03'} lazyLoad={isMeteredStory} key={'MP03'} />;
  const RP09StoryDesktop = () => <ArcAd staticSlot={'RP09-Story-Desktop'} lazyLoad={isMeteredStory} key={'RP09-Story-Desktop'} />;
  const RP09StoryTablet = () => <ArcAd staticSlot={'RP09-Story-Tablet'} lazyLoad={isMeteredStory} key={'RP09-Story-Tablet'} />;
  const connextThankYouMessage = () => <ConnextThankYouMessage isAmp={ampPage} siteFullname={siteFullname} />;

  const windowExists = typeof window !== 'undefined';

  const isSafari = () => {
    if (windowExists) return !!(!navigator.userAgent.includes('Chrome') && navigator.userAgent.match(/Safari/i));
    return null;
  };

  // destructured it in two parts due to page getting broken when hide_timestamp doesn't exist
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};
  const filteredContentElements = filterContentElements({ contentElements });
  const maxNumberOfParagraphs = paragraphCounter(filteredContentElements);
  const stop = maxNumberOfParagraphs === 4 ? 4 : 5;

  const { tags = [], sections } = taxonomy || {};

  const hyperlocalTags = getProperties().hyperlocalTags || [];
  // Both checks return true if the tag is present and false if not.
  const noAds = checkTags(tags, 'no-ads');
  const isHyperlocalContent = checkTags(tags, hyperlocalTags);
  const isCommunityContributor = checkTags(tags, 'community contributor');
  const hideRelatedList = checkTags(tags, 'no-related-list');
  const { sponsorSectionID } = checkSponsor(sections);
  const { sponsorName: sponsorContentLabel, disableSponsorRelatedBox } = getSponsorData(sections, true) || {};

  let infoBoxIndex = null;
  let paragraphIndex = 0;
  const insertAtEndOfStory = [];

  filteredContentElements.forEach((el, i) => {
    if (el && el.type === 'divider' && infoBoxIndex === null) {
      infoBoxIndex = i;
    }
    if (isParagraph(el.type)) {
      paragraphIndex += 1;
      if (paragraphIndex === 6 && !ampPage) {
        filteredContentElements.splice(i, 0, <ConnextInlinePromoSubscription />);
      }
    }
    return null;
  });

  if (infoBoxIndex !== null && !ampPage) {
    // there is an infobox.  To match criteria in APD-96 we must insert ConnextEndOfStory immediately prior to it
    filteredContentElements.splice(infoBoxIndex, 0, <ConnextHyperLocalSubscription />, <ConnextEndOfStory />);
    infoBoxIndex += 1;
  } else if (!ampPage) {
    insertAtEndOfStory.push(<ConnextHyperLocalSubscription />, <ConnextEndOfStory />);
  }

  const storyContentOutput = () => <>
    <Section
      elements={filteredContentElements}
      startIndex={1}
      stopIndex={3}
      rightRail={!noAds && !ampPage ? { insertBeforeParagraph: 2, ad: RP01StoryDesktop } : null}
      insertedAds={!noAds ? [{ insertAfterParagraph: 2, adArray: !noAds && !ampPage ? [RP01StoryTablet, MP02] : [ampMP02] }] : null}
      fullWidth={noAds}
      comesAfterDivider={infoBoxIndex && infoBoxIndex <= 1}
      ampPage={ampPage}
    />
    {!noAds && maxNumberOfParagraphs === 3 && <InterscrollerPlaceholder
      ampPage={ampPage}
      isHyperlocalContent={isHyperlocalContent}
      taxonomy={taxonomy}
      uuid={uuid}
      isMeteredStory={isMeteredStory}
    />}
    {!noAds && !isHyperlocalContent && !sponsorSectionID && (
      <Nativo
        elements={filteredContentElements}
        displayIfAtLeastXParagraphs={4}
        controllerClass="story-nativo_placeholder--moap"
        ampPage={ampPage}
        isMeteredStory={isMeteredStory}
      />
    )}
    <Section
      elements={filteredContentElements}
      startIndex={start}
      stopIndex={stop}
      fullWidth={noAds}
      comesAfterDivider={infoBoxIndex && infoBoxIndex <= start}
      ampPage={ampPage}
      insertedAds={ampPage && maxNumberOfParagraphs >= 4 && paywallStatus !== 'free' ? [{ insertAfterParagraph: 4, adArray: [connextThankYouMessage] }] : null}
    />
    {!noAds && maxNumberOfParagraphs >= 4
      && <>
        {ampPage && isMeteredStory && <NonSubPremiumMessage siteFullname={siteFullname} />}
        <InterscrollerPlaceholder
          ampPage={ampPage}
          isHyperlocalContent={isHyperlocalContent}
          taxonomy={taxonomy}
          uuid={uuid}
          isMeteredStory={isMeteredStory}
        />
      </>
    }
    <Section
      elements={filteredContentElements}
      startIndex={stop}
      rightRail={!noAds && !ampPage ? { insertBeforeParagraph: 8, ad: RP09StoryDesktop } : null}
      insertedAds={!noAds ? [{ insertAfterParagraph: 8, adArray: !noAds && !ampPage ? [RP09StoryTablet, MP03] : [ampMP03] }] : null}
      fullWidth={noAds}
      insertAtSectionEnd={insertAtEndOfStory}
      comesAfterDivider={infoBoxIndex && infoBoxIndex <= stop}
      ampPage={ampPage}
    />

    {sponsorSectionID && (
      // sponsor box should appear right before blog author component
      ampPage ? <SponsorRelatedBoxAMP
          hideRelatedList={hideRelatedList}
          sponsorID={sponsorSectionID}
          taxonomy={taxonomy}
          uuid={uuid} />
        : <SponsorRelatedBox
          hideRelatedList={hideRelatedList}
          sponsorID={sponsorSectionID}
          taxonomy={taxonomy}
          uuid={uuid} />
    )}
    {(!sponsorSectionID || disableSponsorRelatedBox === 'true') && !hideRelatedList && (
      <div className="c-section full-width b-clear-both">
        <RelatedList taxonomy={taxonomy} uuid={uuid} isAmp={ampPage} />
      </div>
    )}
    {/* about the author should be the last component of the story */}
    {<div className="c-section full-width b-clear-both"><BlogAuthor subtype={subtype} authorData={authorData} key={'BlogAuthor'} ampPage={ampPage} /></div>}
    {!noAds && !isHyperlocalContent && <TaboolaFeed ampPage={ampPage} lazyLoad={isMeteredStory} />}
    {!noAds && !isHyperlocalContent && !sponsorSectionID && (
      <Nativo elements={filteredContentElements} controllerClass="story-nativo_placeholder--boap" ampPage={ampPage} />
    )}
    {!noAds && ampPage && (
      <AmpAd adSlot="MSW01" uuid={uuid} width={'300'} height={'250'} taxonomy={taxonomy} componentName={'ArcAd'} isMeteredStory={isMeteredStory} />
    )}
  </>;

  return (
    <>
      {!noAds && <GlobalAdSlots ampPage={ampPage} uuid={uuid} taxonomy={taxonomy} lazyLoad={isMeteredStory} />}
      {!noHeaderAndFooter && (
        <TopNavBreakingNews articleURL={articleURL} headlines={headlines} comments={comments} type={type} ampPage={ampPage} noAds={noAds} />
      )}
      <SponsorBanner sponsorID={sponsorSectionID} ampPage={ampPage} />
      <main className="c-articleContent b-contentMaxWidth b-sectionHome-padding">
        <header className="b-margin-bottom-d30-m30">
          <div className={promoType === 'gallery' ? 'c-header-gallery' : 'c-header'}>
            <Headline
              headlines={headlines}
              basicItems={basicItems}
              taxonomy={taxonomy}
              ampPage={ampPage}
              contentType={type}
              lazyLoad={isMeteredStory} />
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'flex-center', flexWrap: 'wrap' }}
            className="c-label-wrapper b-margin-bottom-d7-m7"
          >
            {!isCommunityContributor && (
              <SectionLabel label={label} taxonomy={taxonomy} ampPage={ampPage} sponsorContentLabel={sponsorContentLabel} />
            )}
          </div>
          <div className="b-flexRow article-byline b-margin-bottom-d7-m7">
            <Byline by={authorData} sections={sections} />
          </div>
          <div className="b-margin-bottom-d7-m7" style={{ display: 'flex', justifyContent: 'flex-center', flexWrap: 'wrap' }}>
            <TimeStamp
              firstPublishDate={firstPublishDate}
              displayDate={displayDate}
              isHideTimestampTrue={isHideTimestampTrue}
              ampPage={ampPage}
              isHyperlocalContent={isHyperlocalContent && isCommunityContributor}
              sponsorContentLabel={sponsorContentLabel}
            />
          </div>
          <ContributorBadge tags={tags} ampPage={ampPage}/>
          <PartnerBadge sections={sections} ampPage={ampPage}/>
          {ampPage && <SocialShare headlines={headlines} articleURL={articleURL} />}
          <div className="b-flexRow b-flexCenter b-margin-bottom-d7-m7">
            <SubHeadline subheadlines={subheadlines} />
          </div>
        </header>

        <article>
          {!noAds && !ampPage && !isHyperlocalContent && (
            <div className="c-hp01-mp01">
              <ArcAd staticSlot={'HP01'} />
              <ArcAd staticSlot={'MP01'} />
            </div>
          )}
          <div className={`c-articleBodyContainer ${isSafari ? 'is-safari' : ''}`}>
            {!noAds && ampPage && !isHyperlocalContent && (
              <AmpAd adSlot="MP01" uuid={uuid} width={'320'} height={'50'} taxonomy={taxonomy} componentName={'ArcAd'} />
            )}

            <SponsorStoryMessage sponsorID={sponsorSectionID} paywallStatus={paywallStatus} isAmp={ampPage} siteFullname={siteFullname} />
            <Section
              elements={filteredContentElements}
              stopIndex={1}
              fullWidth={true}
              comesAfterDivider={infoBoxIndex && infoBoxIndex === 0}
              ampPage={ampPage}
            />
            {!noAds && !ampPage && isHyperlocalContent && (
              <div className="c-hp01-mp01">
                <ArcAd staticSlot={'HP01'} lazyLoad={isMeteredStory} />
                <ArcAd staticSlot={'MP01'} lazyLoad={isMeteredStory} />
              </div>
            )}
            {!noAds && ampPage && isHyperlocalContent && (
              <AmpAd adSlot="MP01" uuid={uuid} width={'320'} height={'50'} taxonomy={taxonomy} componentName={'ArcAd'} isMeteredStory={isMeteredStory} />
            )}
            {ampPage && isMeteredStory && <>
              <PaywallLimitMessage siteFullname={siteFullname} />
              <div amp-access='Error=true OR AccessLevel="Full Content Access"' amp-access-hide>
                {storyContentOutput()}
              </div>
            </>}
            {(!ampPage || (ampPage && !isMeteredStory)) && storyContentOutput()}
          </div>
        </article>
      </main>
      {!ampPage && !noHeaderAndFooter && <>
        <Footer />
        <Copyright />
      </>}
      {ampPage && <Carousel storyId={uuid} taxonomy={taxonomy} />}
      {/* if it's a metered story, add the connext auth handlers to load deferred items (e.g. anything with `lazyLoad` above) */}
      {isMeteredStory && ConnextAuthTrigger()}
    </>
  );
};

StoryPageLayout.sections = [];

export default StoryPageLayout;
