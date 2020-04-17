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
    publish_date: firstPublishDate,
  } = globalContent || {};
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
  tags.forEach((tag) => {
    if (tag && tag.text) {
      topics.push(tag.text);
    }
  });

  if (primarySectionReference) {
    // TODO: sort out referenced sections, for non-native content (e.g. wires)
  }
  const isTopMostSection = (primarySectionId === parentSectionId || parentSectionId === '/');
  const topSection = isTopMostSection ? primarySectionName : parentSectionId;
  const secondarySection = isTopMostSection ? '' : primarySectionName;
  const firstPubDateObj = new Date(firstPublishDate);
  const month = `${firstPubDateObj.getMonth()}`;
  const dayOfTheMonth = `${formatDate(firstPubDateObj)}`;
  const year = `${firstPubDateObj.getFullYear()}`;
  const time = `${formatTime(firstPubDateObj, true)}`;
  /* eslint-disable-next-line max-len */
  const firstPublishDateConverted = `${year}${month < 10 ? `0${month}` : month}${dayOfTheMonth}${time.replace(/:/g, '').replace(/\s[A|P]M/g, '')}`;

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
          'pageSiteSection': '${topSection}',
          'pageCategory': '${secondarySection}',
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
          'contentByline': '//TODO',
          'contentOriginatingSite': '${metrics && metrics.siteID ? metrics.siteID : site}',
          'contentID': '${uuid}',
          'contentVendor': '${sourceType && sourceType === 'wires' ? sourceSystem.toLowerCase() : ''}',
          'contentPublishDate': '${firstPublishDateConverted}',
          'blogName': '//TODO',
          'galleryName': '//TODO'
        };

        DDO.userData = {
          'userStatus': '',
          'userProfileID': '',
          'userType': '',
          'userActive': ''
        };

        DDO.eventData = {
          'action': '<string>'
        };
      `,
    }}></script>
  );
};

export default SiteMetrics;
