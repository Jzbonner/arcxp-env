import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { connext } from 'fusion:environment';
import getProperties from 'fusion:properties';
import getContentMeta from '../siteMeta/_helper_functions/getContentMeta';

const SiteMetrics = ({ isAmp }) => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  const {
    source,
    credits,
    type: contentType,
    promo_items: promoItems,
    headlines: contentHeadlines,
  } = globalContent || {};

  const { basic = {} } = promoItems || {};
  const { headlines: promoHeadlines } = basic;
  const { type: promoType = '' } = basic || {};
  const { canonical_url: canonicalUrl } = basic || {};

  const { by: authorData } = credits || {};
  const {
    system: sourceSystem,
    type: sourceType,
  } = source || {};
  const authors = [];
  const ampAuthors = [];
  let galleryHeadline = '';

  if (authorData) {
    authorData.forEach((author) => {
      const { _id: authorID, name: authorName, type } = author || {};
      if (isAmp) {
        // eslint-disable-next-line quote-props
        ampAuthors.push(`{ "_id": "${authorID}", "name": "${authorName}", "type": "${type}"}`);
      }
      authors.push(authorName);
    });
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
  const siteDomain = siteDomainURL || `//www.${site}.com`;

  if (isAmp) {
    return (
      <amp-analytics
        config={`https://www.googletagmanager.com/amp.json?id=${metrics.ampGtmID}&gtm.url=SOURCE_URL`}
        data-credentials='include'>
        <script type='application/json' dangerouslySetInnerHTML={{
          __html: `{
            "vars": {
              "authors": [${ampAuthors}],
              "canonicalUrl":"${canonicalUrl}",
              "groups": "default",
              "pageName": "${url}",
              "pageSiteSection": "${topSection}",
              "pageCategory": "${secondarySection}",
              "pageContentType": "${typeOfPage || pageContentType}",
              "pageTitle": "${seoTitle ? seoTitle.replace(/'/g, '"') : title.replace(/'/g, '"')}",
              "pageFlow": "",
              "pageNumber": "",
              "siteVersion": "instant",
              "siteDomain": "${siteDomain}",
              "siteMetro": "${metrics && metrics.siteMetro ? metrics.siteMetro : ''}",
              "siteFormat": "${metrics && metrics.siteFormat ? metrics.siteFormat : 'news'}",
              "siteMedium": "np",
              "siteID": "${metrics && metrics.siteID ? metrics.siteID : site}",
              "siteType": "free",
              "siteCMS": "arc",
              "contentTopics": "${topics.join()}",
              "contentByline": "${authors.join()}",
              "contentOriginatingSite": "${metrics && metrics.siteID ? metrics.siteID : site}",
              "contentID": "${contentId || ''}",
              "contentVendor": "${sourceType && sourceType === 'wires' ? sourceSystem.toLowerCase() : ''}",
              "contentPublishDate": "${firstPublishDateConverted}",
              "blogName": "${pageContentType === 'blog' ? topSectionName : ''}",
              "galleryName": "${galleryHeadline}",
              "authorName": "${authors}",
              "pageNameStr": "",
              "pageUrlStr": ""
              }
            }
          `,
        }}></script>
    </amp-analytics>
    );
  }

  return (
    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: `
        const initialDataObj = {
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
        };
        // we do a check just in case dataLayer has already been created
        if (window.dataLayer) {
          dataLayer.push(initialDataObj);
        } else {
          dataLayer = [initialDataObj];
        }

      `,
    }}></script>
  );
};

SiteMetrics.propTypes = {
  isAmp: PropTypes.bool,
};
export default SiteMetrics;
