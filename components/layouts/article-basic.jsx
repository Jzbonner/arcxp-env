/*  /components/layouts/article-basic.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
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
import Gallery from '../features/gallery/default.jsx';
import NavBar from '../_helper_components/global/navBar/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import ArcAd from '../features/ads/default';
import ContributorBadge from '../_helper_components/global/contributorBadge/default';
import { paragraphCounter, isParagraph } from './_helper_functions/Paragraph';
import '../../src/styles/container/_article-basic.scss';
import '../../src/styles/base/_utility.scss';
import filterContentElements from './_helper_functions/article/filterContentElements';
import ConnextEndOfStory from '../_helper_components/global/connextEndOfStory/default';
import ConnextHyperLocalSubscription from '../_helper_components/global/ConnextHyperLocalSubscription/ConnextHyperLocalSubscription';
import FlatPage from '../_helper_components/flatpage/default';
import ConnextInlinePromoSubscription from '../_helper_components/global/connextInlinePromo/default';
import getQueryParams from './_helper_functions/getQueryParams';
import checkTags from './_helper_functions/checkTags';
import checkSponsor from './_helper_functions/checkSponsor';
import AmpAd from '../_helper_components/amp/amp-ads/AmpAd';
import Carousel from '../_helper_components/article/carousel/default';
import SponsorBanner from '../_helper_components/article/sponsorBanner/default';
import WeatherAlerts from '../_helper_components/global/weatherAlerts/default';
import SponsorRelatedBox from '../_helper_components/article/sponsorRelatedBox/default';

const RP01StoryDesktop = () => <ArcAd staticSlot={'RP01-Story-Desktop'} key={'RP01-Story-Desktop'} />;
const RP01StoryTablet = () => <ArcAd staticSlot={'RP01-Story-Tablet'} key={'RP01-Story-Tablet'} />;
const MP02 = () => <ArcAd staticSlot={'MP02'} key={'MP02'} />;
const MP03 = () => <ArcAd staticSlot={'MP03'} key={'MP03'} />;

const RP09StoryDesktop = () => <ArcAd staticSlot={'RP09-Story-Desktop'} key={'RP09-Story-Desktop'} />;
const RP09StoryTablet = () => <ArcAd staticSlot={'RP09-Story-Tablet'} key={'RP09-Story-Tablet'} />;

const start = 3;

const StoryPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent, requestUri } = appContext;

  if (!globalContent) return null;
  const {
    _id: uuid,
    first_publish_date: firstPublishDate,
    last_updated_date: lastUpdatedDate,
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
  } = globalContent || {};
  if (subtype === 'Flatpage') return <FlatPage globalContent={globalContent} />;

  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';
  const ampMP02 = () => <AmpAd adSlot="MP02" uuid={uuid} width={'300'} height={'250'} taxonomy={taxonomy} componentName={'ArcAd'} />;
  const ampMP03 = () => <AmpAd adSlot="MP03" uuid={uuid} width={'300'} height={'250'} taxonomy={taxonomy} componentName={'ArcAd'} />;

  const { by: authorData } = credits || {};
  const { basic: basicItems } = promoItems || {};
  const { type: promoType = '' } = basicItems || {};

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
  const { sponsorSectionID } = checkSponsor(sections);

  let infoBoxIndex = null;
  let paragraphIndex = 0;
  const BlogAuthorComponent = () => <BlogAuthor subtype={subtype} authorData={authorData} key={'BlogAuthor'} ampPage={ampPage} />;
  const insertAtEndOfStory = [];
  const interscrollerPlaceholder = () => {
    if (isHyperlocalContent && ampPage) {
      return (
        <amp-fx-flying-carpet height="auto">
          <div className="story-interscroller__placeholder full-width c-clear-both" key={'interscrollerPlaceholder'}></div>
        </amp-fx-flying-carpet>
      );
    }
    return <div className="story-interscroller__placeholder full-width c-clear-both" key={'interscrollerPlaceholder'}></div>;
  };
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
  // about the author should be the last component of the story
  insertAtEndOfStory.push(BlogAuthorComponent);
  // sponsor box should appear right after blog author component
  insertAtEndOfStory.push(<SponsorRelatedBox sponsorID={sponsorSectionID} uuid={uuid} />);

  return (
    <>
      {!noAds && <GlobalAdSlots ampPage={ampPage} uuid={uuid} taxonomy={taxonomy} />}
      <BreakingNews />
      <WeatherAlerts />
      <NavBar articleURL={articleURL} headlines={headlines} comments={comments} type={type} ampPage={ampPage} />
      <main>
        <header className="b-margin-bottom-d30-m20">
          <div className={promoType === 'gallery' ? 'c-header-gallery' : 'c-header'}>
            <SponsorBanner sponsorID={sponsorSectionID} ampPage={ampPage} />
            <Headline headlines={headlines} basicItems={basicItems} taxonomy={taxonomy} ampPage={ampPage} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }} className="c-label-wrapper b-pageContainer b-margin-bottom-d15-m10">
            {!isCommunityContributor && <SectionLabel label={label} taxonomy={taxonomy} ampPage={ampPage} sections={sections}/>}
            <TimeStamp
              firstPublishDate={firstPublishDate || lastUpdatedDate || displayDate}
              displayDate={displayDate}
              isHideTimestampTrue={isHideTimestampTrue}
              ampPage={ampPage}
              isHyperlocalContent={isHyperlocalContent && isCommunityContributor}
            />
          </div>
          <div className="b-flexRow b-flexCenter b-pageContainer">
            <Byline by={authorData} sections={sections}/>
          </div>
          <ContributorBadge tags={tags} ampPage={ampPage} />
          {ampPage && <SocialShare headlines={headlines} promoItems={promoItems} articleURL={articleURL} />}
          <div className="b-flexRow b-flexCenter b-margin-bottom-d15-m10 b-pageContainer">
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
          {!noAds && ampPage && !isHyperlocalContent && (
            <AmpAd adSlot="MP01" uuid={uuid} width={'320'} height={'50'} taxonomy={taxonomy} componentName={'ArcAd'} />
          )}
          <Section
            elements={filteredContentElements}
            stopIndex={1}
            fullWidth={true}
            comesAfterDivider={infoBoxIndex && infoBoxIndex === 0}
            ampPage={ampPage}
          />
          {!noAds && !ampPage && isHyperlocalContent && (
            <div className="c-hp01-mp01">
              <ArcAd staticSlot={'HP01'} />
              <ArcAd staticSlot={'MP01'} />
            </div>
          )}
          {!noAds && ampPage && isHyperlocalContent && (
            <AmpAd adSlot="MP01" uuid={uuid} width={'320'} height={'50'} taxonomy={taxonomy} componentName={'ArcAd'} />
          )}
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
          {!noAds && maxNumberOfParagraphs === 3 && interscrollerPlaceholder()}
          {!noAds && !isHyperlocalContent && !sponsorSectionID && (
            <Nativo
              elements={filteredContentElements}
              displayIfAtLeastXParagraphs={4}
              controllerClass="story-nativo_placeholder--moap"
              ampPage={ampPage}
            />
          )}
          <Section
            elements={filteredContentElements}
            startIndex={start}
            stopIndex={stop}
            fullWidth={noAds}
            comesAfterDivider={infoBoxIndex && infoBoxIndex <= start}
            ampPage={ampPage}
          />
          {!noAds && maxNumberOfParagraphs >= 4 && interscrollerPlaceholder()}
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
          {(!basicItems || promoType !== 'gallery') && !ampPage ? (
            <Gallery contentElements={filteredContentElements} pageType={subtype} />
          ) : null}
          {!isHyperlocalContent && <TaboolaFeed ampPage={ampPage} />}
          {!noAds && !isHyperlocalContent && !sponsorSectionID && (
            <Nativo elements={filteredContentElements} controllerClass="story-nativo_placeholder--boap" ampPage={ampPage} />
          )}
          {!noAds && ampPage && (
            <AmpAd adSlot="MSW01" uuid={uuid} width={'300'} height={'250'} taxonomy={taxonomy} componentName={'ArcAd'} />
          )}
        </article>
      </main>
      {!ampPage && <Footer />}
      <Copyright />
      {ampPage && <Carousel storyId={uuid} taxonomy={taxonomy} />}
    </>
  );
};

StoryPageLayout.sections = [];

export default StoryPageLayout;
