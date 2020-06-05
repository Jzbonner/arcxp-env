import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { connext } from 'fusion:environment';
import getProperties from 'fusion:properties';
import getContentMeta from '../siteMeta/_helper_functions/getContentMeta';

const SiteMetrics = ({ isAmp }) => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  // console.log(appContext);
  const {
    source,
    credits,
    type: contentType,
    promo_items: promoItems,
    headlines: contentHeadlines,
  } = globalContent || {};
  console.log(globalContent);

  const { basic = {} } = promoItems || {};
  const { headlines: promoHeadlines } = basic;
  const { type: promoType = '' } = basic || {};
  const { canonical_url: canonicalUrl } = basic || {};
  const { by: authorData } = credits || {};
  console.log(authorData);
  const { additional_properties: additionalProperties } = authorData[0] || {};
  console.log(additionalProperties);

  const {
    system: sourceSystem,
    type: sourceType,
  } = source || {};
  const authors = [];
  let galleryHeadline = '';

  if (authorData) {
    authorData.forEach(author => author.name && authors.push(author.name));
  }

  if (contentType === 'gallery') {
    galleryHeadline = contentHeadlines && contentHeadlines.basic ? contentHeadlines.basic : '';
  } else if (promoType === 'gallery') {
    galleryHeadline = promoHeadlines && promoHeadlines.basic ? promoHeadlines.basic : '';
  }

  const { metrics, siteDomainURL } = getProperties() || {};
  const contentMeta = getContentMeta();

  if (!contentMeta) {
    return null;
  }

  const {
    url,
    topSection,
    secondarySection,
    topSectionName,
    pageContentType,
    typeOfPage,
    site,
    title,
    seoTitle,
    topics,
    contentId,
    firstPublishDateConverted,
  } = contentMeta || {};
  console.log(contentMeta);
  console.log(authors);
  const siteDomain = siteDomainURL || `//www.${site}.com`;

  if (isAmp) {
    return (
      <amp-analytics
        config='https://www.googletagmanager.com/amp.json?id=GTM-WQBXD72&gtm.url=SOURCE_URL'
        data-credentials='include'>
        <script type='application/json' dangerouslySetInnerHTML={{
          __html: `{'vars': 
          {'adTarget': 'Atlanta_TV/wsbtv_web_default/news/local/atlanta',
          'authors': '${authors}',
          'canonicalUrl':'${canonicalUrl}',
          'groups': 'default',
          'pageName': '${url}',
          'pageSiteSection': '${topSection}',
          'pageCategory': '${secondarySection}',
          'pageContentType': '${typeOfPage || pageContentType}',
          'pageTitle': '${seoTitle ? seoTitle.replace(/'/g, '"') : title.replace(/'/g, '"')}',
          'pageFlow': '',
          'pageNumber': '',
          'siteVersion': 'instant',
          'siteDomain': '${siteDomain}',
          'siteMetro': '${metrics && metrics.siteMetro ? metrics.siteMetro : ''}',
          'siteFormat': '${metrics && metrics.siteFormat ? metrics.siteFormat : 'news'}',
          'siteMedium': 'np',
          'siteID': '${metrics && metrics.siteID ? metrics.siteID : site}',
          'siteType': 'free',
          'siteCMS': 'arc',
          'contentTopics': '${topics.join()}',
          'contentByline': '${authors.join()}',
          'contentOriginatingSite': '${metrics && metrics.siteID ? metrics.siteID : site}',
          'contentID': '${contentId || ''}',
          'contentVendor': '${sourceType && sourceType === 'wires' ? sourceSystem.toLowerCase() : ''}',
          'contentPublishDate': '${firstPublishDateConverted}',
          'blogName': '${pageContentType === 'blog' ? topSectionName : ''}',
          'galleryName': '${galleryHeadline}',
          'authorName': '${authors}',
        'pageNameStr': '',
        'pageUrlStr': ''
          }
        }
        `,
        }}></script>
    </amp-analytics>
    );
  }

  return (
    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: `let dataLayer = window.dataLayer || [];
        dataLayer.push({
          'connextActive': '${connext && connext.isEnabled ? connext.isEnabled : 'false'}',
          'pageData': {
            'pageName': '${url}',
            'pageURL': '${siteDomain}${url}',
            'pageSiteSection': '${topSection}',
            'pageMainSection': '${topSection}',
            'pageCategory': '${secondarySection}',
            'pageContentType': '${typeOfPage || pageContentType}',
            'pageTitle': '${seoTitle ? seoTitle.replace(/'/g, '"') : title.replace(/'/g, '"')}'
          },
          'siteData': {
            'siteID': '${metrics && metrics.siteID ? metrics.siteID : site}',
            'siteDomain': '${siteDomain}',
            'siteVersion': 'responsive site',
            'siteFormat': '${metrics && metrics.siteFormat ? metrics.siteFormat : 'news'}',
            'siteMetro': '${metrics && metrics.siteMetro ? metrics.siteMetro : ''}',
            'siteMedium': 'np',
            'siteType': 'free',
            'siteCMS': 'arc'
          },
          'contentData': {
            'contentTopics': '${topics.join()}',
            'contentByline': '${authors.join()}',
            'contentOriginatingSite': '${metrics && metrics.siteID ? metrics.siteID : site}',
            'contentID': '${contentId || ''}',
            'contentVendor': '${sourceType && sourceType === 'wires' ? sourceSystem.toLowerCase() : ''}',
            'contentPublishDate': '${firstPublishDateConverted}',
            'blogName': '${pageContentType === 'blog' ? topSectionName : ''}',
            'galleryName': '${galleryHeadline}'
          }
        });
      `,
    }}></script>
  );
};

SiteMetrics.propTypes = {
  isAmp: PropTypes.bool,
};
export default SiteMetrics;
