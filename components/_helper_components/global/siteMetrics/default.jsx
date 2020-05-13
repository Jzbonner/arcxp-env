import React from 'react';
import { useAppContext } from 'fusion:context';
import { connext } from 'fusion:environment';
import getProperties from 'fusion:properties';
import getContentMeta from '../siteMeta/_helper_functions/getContentMeta';

const SiteMetrics = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  const {
    source,
    credits,
  } = globalContent || {};
  const { by: authorData } = credits || {};
  const {
    system: sourceSystem,
    type: sourceType,
  } = source || {};
  const authors = [];
  if (authorData) {
    authorData.forEach(author => author.name && authors.push(author.name));
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
    site,
    title,
    topics,
    contentId,
    firstPublishDateConverted,
  } = contentMeta || {};
  const siteDomain = siteDomainURL || `//www.${site}.com`;

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
            'pageContentType': '${pageContentType}',
            'pageTitle': '${title.replace('\'', '"')}'
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
            'blogName': '${pageContentType === 'blog' ? topSectionName : ''}'
          }
        });
      `,
    }}></script>
  );
};

export default SiteMetrics;
