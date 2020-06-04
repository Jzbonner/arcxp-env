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
    typeOfPage,
    site,
    title,
    topics,
    contentId,
    firstPublishDateConverted,
  } = contentMeta || {};
  const siteDomain = siteDomainURL || `//www.${site}.com`;

  if (isAmp) {
    return (
      <amp-analytics
        config='https://www.googletagmanager.com/amp.json?id=GTM-WQBXD72&gtm.url=SOURCE_URL'
        data-credentials='include'>
        <script type='application/json' dangerouslySetInnerHTML={{
          __html: `{'vars': 
          {'adTarget': 'Atlanta_TV/wsbtv_web_default/news/local/atlanta',
          'authors': [{'_id': 'matt-johnson','name': 'Matt Johnson','type': 'author'}],
          'canonicalUrl':
          '/news/local/atlanta/daycares-summer-camps-allowed-reopen-parents-wonder-if-its-safe-send-their-kids/2RUIKPTBFVGWLGYQEP7434ZLJQ/',
          'groups': 'default',
          'pageName': '',
          'pageSiteSection': 'newslocal',
          'pageCategory': 'atlanta',
          'pageContentType': 'story',
          'pageTitle': 'Day cares, summer camps allowed to reopen but parents wonder if it’s safe to send their kids',
          'pageFlow': '',
          'pageNumber': '',
          'siteVersion': 'instant',
          'siteDomain': 'ajc.com',
          'siteMetro': 'ga: atlanta',
          'siteFormat': 'news',
          'siteMedium': 'np',
          'siteID': 'ajc',
          'siteType': 'free',
          'siteCMS': 'arc',
          'contentTopics': ['coronaviruswsb'],
          'contentByline': ['Matt Johnson, WSBTV'],
          'contentOriginatingSite': '',
          'contentID': '2RUIKPTBFVGWLGYQEP7434ZLJQ',
          'contentVendor': '',
          'contentPublishDate': '20200513230103',
          'blogName': '',
          'galleryName': '',
          'authorName': [
            'Matt Johnson'
        ],
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

SiteMetrics.propTypes = {
  isAmp: PropTypes.bool,
};
export default SiteMetrics;
