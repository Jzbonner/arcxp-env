import React from 'react';
import { useAppContext } from 'fusion:context';
import { connext } from 'fusion:environment';
import getProperties from 'fusion:properties';
import checkPageType from '../../../layouts/_helper_functions/getPageType.js';
import { formatTime, formatDate } from '../../article/timestamp/_helper_functions/computeTimeStamp';

const SiteMetrics = () => {
  const appContext = useAppContext();
  const {
    globalContent,
    layout,
    metaValue,
    requestUri,
  } = appContext;
  const {
    headlines,
    _id: uuid,
    taxonomy,
    source,
    type,
    credits,
    publish_date: firstPublishDate,
    data: contentData,
  } = globalContent || {};
  const {
    siteName,
    siteDomainURL,
    metrics,
  } = getProperties() || {};
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
    referent: primarySectionReference,
  } = section || {};

  const topics = [];
  if (tags) {
    tags.forEach(tag => tag && tag.text && topics.push(tag.text));
  }

  const authors = [];
  if (authorData) {
    authorData.forEach(author => author.name && authors.push(author.name));
  }

  const pageType = checkPageType(type, layout);
  const {
    isHomeOrSectionPage,
    isHome,
    isSection,
    type: typeOfPage,
  } = pageType || {};
  let pageContentType = typeOfPage === 'story' ? 'article' : typeOfPage;
  if (isHome) {
    pageContentType = 'homepage';
  } else if (isSection) {
    pageContentType = 'section front';
  }

  let topSection = '';
  let secondarySection = '';
  let tertiarySection = '';
  const setSectionOutput = (sectionId) => {
    const sectionArray = sectionId.toLowerCase().replace(/-/g, ' ').split('/');
    if (sectionArray[0] === '') {
      sectionArray.splice(0, 1);
    }
    const {
      0: mainSection,
      1: subSection,
      2: thirdSection,
    } = sectionArray;
    topSection = mainSection;
    secondarySection = subSection || '';
    tertiarySection = thirdSection || '';
  };
  if (!section) {
    // there is no section object, so it's likely a pagebuilder page (without a true "section" associated)
    setSectionOutput(requestUri);
  } else if (primarySectionReference && !primarySectionId) {
    // it's imported content with (only) a section reference
    setSectionOutput(primarySectionReference.id);
  } else if (isHomeOrSectionPage) {
    // it's native content with true section object(s) associated
    setSectionOutput(primarySectionId);
  }
  let site = siteName ? siteName.toLowerCase() : '';
  let title = headlines ? headlines.basic : metaValue('title') || site;
  let contentId = uuid;
  let pubDate = firstPublishDate;
  if (contentData) {
    // it's a list or list-type page, let's re-set some values
    const {
      id,
      normalized_name: normalizedName,
      name,
      last_updated_date: lastUpdatedDate,
      canonical_website: canonicalSite,
    } = contentData || {};
    contentId = id;
    title = normalizedName || name;
    site = canonicalSite;
    pubDate = lastUpdatedDate;
  }
  const firstPubDateObj = new Date(pubDate);
  let firstPublishDateConverted = '';
  if (pubDate) {
    const month = `${firstPubDateObj.getMonth()}`;
    const dayOfTheMonth = `${formatDate(firstPubDateObj)}`;
    const year = `${firstPubDateObj.getFullYear()}`;
    const time = `${formatTime(firstPubDateObj, true)}`;
    /* eslint-disable-next-line max-len */
    firstPublishDateConverted = `${year}${month < 10 ? `0${month}` : month}${dayOfTheMonth}${time.indexOf('1') !== 0 ? '0' : ''}${time.replace(/:/g, '').replace(/\s[A|P]M/g, '')}`;
  }

  return (
    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: `var dataLayer = dataLayer || {};
        dataLayer.connextActive = '${connext && connext.isEnabled ? connext.isEnabled : 'false'}';
        dataLayer.pageData = {
          'pageName': '${requestUri}',
          'pageSiteSection': '${topSection}',
          'pageCategory': '${secondarySection}',
          'pageSubCategory': '${tertiarySection}',
          'pageContentType': '${pageContentType}',
          'pageTitle': '${title.replace('\'', '"')}'
        };
        dataLayer.siteData = {
          'siteID': '${metrics && metrics.siteID ? metrics.siteID : site}',
          'siteDomain': '${siteDomainURL || `${site}.com`}',
          'siteVersion': 'responsive site',
          'siteFormat': '${metrics && metrics.siteFormat ? metrics.siteFormat : 'news'}',
          'siteMetro': '${metrics && metrics.siteMetro ? metrics.siteMetro : ''}',
          'siteMedium': 'np',
          'siteType': 'free',
          'siteCMS': 'arc'
        };
        dataLayer.contentData = {
          'contentTopics': '${topics.join()}',
          'contentByline': '${authors.join()}',
          'contentOriginatingSite': '${metrics && metrics.siteID ? metrics.siteID : site}',
          'contentID': '${contentId || ''}',
          'contentVendor': '${sourceType && sourceType === 'wires' ? sourceSystem.toLowerCase() : ''}',
          'contentPublishDate': '${firstPublishDateConverted}',
          'blogName': '${type === 'blog' ? secondarySection : ''}'
        };
        dataLayer.userData = {
          'userStatus': '<string>',
          'userProfileID': '<string>',
          'userType': '<string>',
          'userActive': '<string>'
        };
      `,
    }}></script>
  );
};

export default SiteMetrics;
