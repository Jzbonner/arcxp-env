import React from 'react';
import { useAppContext } from 'fusion:context';
import { connext, ENVIRONMENT } from 'fusion:environment';
import getProperties from 'fusion:properties';
import checkPageType from '../../../layouts/_helper_functions/getPageType.js';
import { formatTime, formatDate } from '../../article/timestamp/_helper_functions/computeTimeStamp';

const SiteMetrics = () => {
  const appContext = useAppContext();
  const {
    globalContent,
    layout,
    metaValue,
  } = appContext;
  const {
    headlines,
    _id: uuid,
    taxonomy,
    source,
    type,
    credits,
    publish_date: firstPublishDate,
  } = globalContent || {};
  const { by: authorData } = credits || {};
  const {
    system: sourceSystem,
    type: sourceType,
  } = source || {};
  const {
    primary_section: section,
    tags = [],
  } = taxonomy || {};
  const {
    _id: primarySectionId,
    name: primarySectionName,
    parent_id: parentSectionId,
    referent: primarySectionReference,
  } = section || {};

  const currentEnv = ENVIRONMENT || 'unknown';
  const isNotProd = currentEnv.toLowerCase().indexOf('prod') === -1;

  const topics = [];
  tags.forEach(tag => tag && tag.text && topics.push(tag.text));

  const authors = [];
  authorData.forEach(author => author.name && authors.push(author.name));

  let topSection = '';
  let secondarySection = '';
  if (primarySectionReference && !primarySectionId) {
    const { id: refSectionId } = primarySectionReference;
    const lastSlashIndex = refSectionId.lastIndexOf('/');
    const isTopMostSection = refSectionId === '/';
    topSection = isTopMostSection ? refSectionId : refSectionId.substring(1, lastSlashIndex);
    secondarySection = isTopMostSection ? '' : refSectionId.substring(lastSlashIndex + 1).replace(/-/g, ' ');
  } else {
    const isTopMostSection = (primarySectionId === parentSectionId || parentSectionId === '/');
    topSection = isTopMostSection ? primarySectionName : parentSectionId;
    secondarySection = isTopMostSection ? '' : primarySectionName;
  }
  const firstPubDateObj = new Date(firstPublishDate);
  const month = `${firstPubDateObj.getMonth()}`;
  const dayOfTheMonth = `${formatDate(firstPubDateObj)}`;
  const year = `${firstPubDateObj.getFullYear()}`;
  const time = `${formatTime(firstPubDateObj, true)}`;
  /* eslint-disable-next-line max-len */
  const firstPublishDateConverted = `${year}${month < 10 ? `0${month}` : month}${dayOfTheMonth}${time.indexOf('1') !== 0 ? '0' : ''}${time.replace(/:/g, '').replace(/\s[A|P]M/g, '')}`;

  const pageType = checkPageType(type, layout);
  const { isHomeOrSectionPage, isHome, isSection } = pageType || {};
  let pageContentType = type;
  if (isHome) {
    pageContentType = 'homepage';
  } else if (isSection) {
    pageContentType = 'section front';
  }

  const { siteName, siteDomainURL, metrics } = getProperties() || {};
  const dtmLibraryJs = metrics && metrics.dtmLibraryURL ? `${metrics.dtmLibraryURL}${isNotProd ? '-staging' : ''}.js` : '';

  const site = siteName.toLowerCase();
  const title = headlines ? headlines.basic : metaValue('title') || siteName;

  return (
    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: `var DDO = DDO || {};
        DDO.DTMLibraryURL = '${dtmLibraryJs}';
        DDO.hasLocalStorage = () => {
          const isDefined = typeof(localStorage) != 'undefined';
          if (isDefined) {
            localStorage.setItem('test', 'test');
            canRetrieve = localStorage.getItem('test') == 'test';
          }
          localStorage.removeItem('test');
          return isDefined && canRetrieve;
        }
        DDO.connextActive = '${connext && connext.isEnabled ? connext.isEnabled : 'false'}';
        DDO.pageData = {
          'pageName': '${isHomeOrSectionPage ? 'website' : 'article'}',
          'pageSiteSection': '${topSection.toLowerCase()}',
          'pageCategory': '${secondarySection.toLowerCase()}',
          'pageSubCategory': '',
          'pageContentType': '${pageContentType}',
          'pageTitle': '${title.replace('\'', '"')}'
        };
        DDO.siteData = {
          'siteID': '${metrics && metrics.siteID ? metrics.siteID : site}',
          'siteDomain': '${siteDomainURL || site}',
          'siteVersion': 'responsive site',
          'siteFormat': '${metrics && metrics.siteFormat ? metrics.siteFormat : 'news'}',
          'siteMetro': '${metrics && metrics.siteMetro ? metrics.siteMetro : ''}',
          'siteMedium': 'np',
          'siteType': 'free',
          'siteCMS': 'arc'
        };
        DDO.contentData = {
          'contentTopics': '${topics.join()}',
          'contentByline': '${authors.join()}',
          'contentOriginatingSite': '${metrics && metrics.siteID ? metrics.siteID : site}',
          'contentID': '${uuid}',
          'contentVendor': '${sourceType && sourceType === 'wires' ? sourceSystem.toLowerCase() : ''}',
          'contentPublishDate': '${firstPublishDateConverted}',
          'blogName': '${type === 'blog' ? secondarySection : ''}'
        };
      `,
    }}></script>
  );
};

export default SiteMetrics;
