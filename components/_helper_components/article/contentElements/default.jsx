import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import BlockQuote from './components/blockQuote/default.jsx';
import GalleryEmbed from './components/gallery/default.jsx';
import HTML from './components/html/default.jsx';
import Image from '../../global/image/default.jsx';
import InterstitialLink from './components/interstitial_link/default.jsx';
import List from './components/list/default.jsx';
import Paragraph from './components/paragraph/default.jsx';
import Oembed from './components/social_url/default.jsx';
import Video from '../../global/video/default';
import Header from './components/header/default.jsx';
import Divider from './components/divider/default.jsx';
import AmpEmbedWrapper from '../../global/utils/amp-html/amp-embed-wrapper';
import Table from './components/table/default';
import AlignedElements from './components/alignedElements/default.jsx';
// import Correction from './components/correction/default.jsx';
// import Table from './components/table/default.jsx';

const ContentElements = ({ contentElements, ampPage = false, startIndex }) => {
  const { inlineVideoPlayerRules, maxTabletViewWidth } = getProperties();

  return (
    <div className="c-contentElements" data-start-index={startIndex || null}>
      {contentElements.map((element, i) => {
        const count = i + 1;
        switch (element.type) {
          case 'div':
            // returns inserted ads
            return element;
          case 'quote':
            return <BlockQuote contentElements={element.content_elements} citation={element.citation} key={`BlockQuote-${i}`} />;
          case 'correction':
            // See APD-451, this element will be worked at a later time.
            // return <Correction src={element} key={`Correction-${i}`} />;
            return null;
          case 'gallery':
            if (ampPage) return null;
            return <GalleryEmbed src={element} key={`Gallery-${i}`} />;
          case 'raw_html':
            if (ampPage) return <AmpEmbedWrapper isHtml={true} element={element} key={`Raw_HTML-${i}`} />;
            return <HTML src={element} key={`Raw_HTML-${i}`} index={count} />;
          case 'header':
            return <Header src={element} key={`Header-${i}`} />;
          case 'image':
            // a height of 0 makes the height proportional to the width
            return (
              <Image
                width={800}
                height={0}
                src={element}
                imageType="isInlineImage"
                ampPage={ampPage}
                imageMarginBottom="b-margin-bottom-d40-m20"
                maxTabletViewWidth={maxTabletViewWidth}
                key={`Image-${i}`}
                useSrcSet={true}
                srcSetSizes={[[1022, 0], [1022, 0], [800, 0]]}
              />
            );
          case 'text':
            return <Paragraph src={element} key={`Paragraph-${i}`} index={count} />;
          case 'interstitial_link':
            return <InterstitialLink src={element} key={`InterstitialLink-${i}`} />;
          case 'list':
            return <List src={element} key={`List-${i}`} />;
          case 'divider':
            return <Divider key={`Divider-${i}`} />;
          case 'oembed_response':
            if (ampPage) return <AmpEmbedWrapper element={element.raw_oembed} key={`Oembed-${i}`} />;
            return <Oembed src={element} key={`Oembed-${i}`} index={count} />;
          case 'table':
            return <Table src={element} key={`Table-${i}`} />;
          case 'video':
            return <Video
                src={element}
                isInlineVideo
                maxTabletViewWidth={maxTabletViewWidth}
                inlineVideoPlayerRules={inlineVideoPlayerRules}
                key={`Video-${i}`}
                index={count}
              />;
          case 'aligned_elements':
            return <AlignedElements src={element} ampPage={ampPage} index={count} />;
          default:
            if (
              element.props
              && element.props.componentName
              && (element.props.componentName === 'ArcAd'
                || element.props.componentName === 'BlogAuthor'
                || element.props.componentName === 'ConnextEndOfStory'
                || element.props.componentName === 'ConnextInlinePromoSubscription'
                || element.props.componentName === 'ConnextHyperLocalSubscription'
                || element.props.componentName === 'SponsorRelatedBox'
                || element.props.componentName === 'RelatedList'
                || element.props.componentName === 'ConnextThankYouMessage'
                || element.props.componentName === 'SponsorRelatedBoxAMP'
              )
            ) {
              return element;
            }
            return null;
        }
      })}
    </div>
  );
};

ContentElements.propTypes = {
  contentElements: PropTypes.array,
  ampPage: PropTypes.boolean,
  startIndex: PropTypes.number,
};

export default ContentElements;
