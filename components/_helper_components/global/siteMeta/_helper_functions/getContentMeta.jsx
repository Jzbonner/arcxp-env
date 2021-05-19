import { useAppContext, useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getDomain from '../../../../layouts/_helper_functions/getDomain';
import checkPageType from '../../../../layouts/_helper_functions/getPageType.js';
import fetchEnv from '../../utils/environment.js';
import { formatTime, formatDate } from '../../../article/timestamp/_helper_functions/computeTimeStamp';

const getContentMeta = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const appContext = useAppContext();
  const {
    siteName, favicon, cdnSite, appleIcon, cdnOrg,
  } = getProperties(arcSite) || {};
  const {
    globalContent,
    layout,
    metaValue,
    requestUri,
    template,
    deployment,
    contextPath,
  } = appContext;
  const {
    headlines,
    description,
    _id: uuid,
    taxonomy,
    type,
    subtype,
    promo_items: promoItems,
    credits,
    first_publish_date: initialPublishDate,
    display_date: dateModified,
    distributor,
    canonical_url: canonicalUrl,
    publish_date: firstPublishDate,
    data: contentData,
    additional_properties: additionalProperties,
    content_elements: contentElements = [],
    content_restrictions: contentRestrictions,
    syndication,
  } = globalContent || {};
  const articleDesc = description;
  const {
    sections = [],
    primary_section: primarySection,
    tags = [],
  } = taxonomy || {};
  const {
    _id: primarySectionId,
    referent: primarySectionReference,
  } = primarySection || {};
  const delimitedSections = sections ? sections.filter(section => section._id !== primarySectionId) : [];
  // Filters sections by site
  const nonPrimarySections = delimitedSections ? delimitedSections.filter(delimitedSection => delimitedSection._website === arcSite) : [];
  const nonPrimarySectionNames = [];
  nonPrimarySections.forEach(section => nonPrimarySectionNames.push(section._id));
  // The set removes the repeating section names
  let nonPrimarySet = [...new Set(nonPrimarySectionNames)];
  nonPrimarySet = nonPrimarySet.join(', ');
  let topics = [];
  if (tags) {
    tags.forEach((tag) => {
      if (tag && tag.text) {
        topics.push(tag.text);
      }
    });
  }
  const pagebuilderTopics = metaValue('topics') || [];
  if (pagebuilderTopics.length) {
    topics = [...topics, ...pagebuilderTopics.split(',')];
  }

  let environ = fetchEnv();
  if (requestUri && requestUri.indexOf('?') > -1) {
    // there is a query string, let's see if it includes "testads"
    const queryString = requestUri.substring(requestUri.indexOf('?'));
    if (queryString.indexOf('testads') > -1) {
      // "testads" exists, let's (re)set the "environ" value
      environ = 'debug';
    }
  }
  const pageType = checkPageType(subtype || type, layout);
  const {
    isHome,
    isSection,
    isWrap,
    type: typeOfPage = '',
    isNonContentPage,
  } = pageType || {};
  let pageContentType = typeOfPage === 'story' ? 'article' : typeOfPage.toLowerCase();
  if (isHome) {
    pageContentType = 'homepage';
  } else if (isSection) {
    pageContentType = 'section front';
  }
  let topSection = primarySectionId;
  let secondarySection = '';
  if (!primarySection) {
    // there is no section object, so it's likely a pagebuilder page (without a true "section" associated)
    topSection = requestUri;
  } else if (primarySectionReference && !primarySectionId) {
    // it's imported content with (only) a section reference
    topSection = primarySectionReference.id || '';
  }
  if (delimitedSections.length) {
    secondarySection = delimitedSections[0]._id || '';
  }
  let topSectionName = '';
  if (topSection) {
    topSectionName = topSection.lastIndexOf('/') > -1 ? topSection.substring(topSection.lastIndexOf('/') + 1) : topSection;
  }
  topSectionName = topSectionName.replace(/-/g, ' ');
  let site = siteName ? siteName.toLowerCase() : '';
  let title = headlines ? headlines.basic : metaValue('title') || site;
  const seoTitle = headlines ? headlines.meta_title : null;
  let desc = description ? description.basic : metaValue('description') || '';
  let contentId = uuid;
  let pubDate = firstPublishDate;
  let uri = requestUri;
  if (!canonicalUrl && uri) {
    // only jump through these hoops if canonical_url is undefined (i.e. pagebuilder pages)
    // remove query string & hashes from uri
    uri = uri.replace(/\?.*/g, '');
    uri = uri.replace(/#.*/g, '');
  }
  if ((desc === undefined || desc === '') && type === 'story') {
    const firstParagraphElement = contentElements.find((el = { type: '', content: '' }) => el.type === 'text' && el.content !== '<br/>');
    const { content: firstParagraphContent = '' } = firstParagraphElement || {};
    desc = firstParagraphContent || '';
  }
  if ((desc === undefined || desc === '') && type === 'gallery') {
    desc = title;
  }
  const newCanonicalUrl = distributor && distributor.subcategory === 'canonical'
    ? additionalProperties && additionalProperties.originalUrl : '';
  const url = newCanonicalUrl || canonicalUrl || uri;
  if (contentData) {
    // it's a list or list-type page, let's re-set some values
    const {
      id,
      normalized_name: normalizedName,
      name,
      last_updated_date: lastUpdatedDate,
      canonical_website: canonicalSite,
      description: contentDesc,
    } = contentData || {};
    contentId = id;
    title = normalizedName || name;
    if (contentDesc) {
      desc = contentDesc;
    }
    site = canonicalSite;
    pubDate = lastUpdatedDate;
  }
  if (template && template.indexOf('page/') > -1) {
    // it's a pagebuilder page, so grab & update the id
    const pageId = template.replace('page/', '');
    if (pageId !== '') {
      contentId = pageId;
    }
  }
  const firstPubDateObj = new Date(pubDate);
  let firstPublishDateConverted = '';
  if (pubDate) {
    const month = `${firstPubDateObj.getMonth() + 1}`; // increment by one because getMonth is 0-indexed
    const dayOfTheMonth = `${formatDate(firstPubDateObj)}`;
    const year = `${firstPubDateObj.getFullYear()}`;
    const time = `${formatTime(firstPubDateObj, true, true)}` || '';
    /* eslint-disable-next-line max-len */
    firstPublishDateConverted = time ? `${year}${month < 10 ? `0${month}` : month}${dayOfTheMonth}${time.indexOf('1') !== 0 ? '0' : ''}${time.replace(/:/g, '').replace(/\s[A|P]M/g, '')}` : `${year}${month < 10 ? `0${month}` : month}${dayOfTheMonth}`;
  }

  let isOpinion = false;
  if (sections) {
    isOpinion = !!sections.find(section => section._id && section._id.indexOf('/opinion') > -1);
  }

  const blogName = metaValue('blogname');
  const noIndex = metaValue('no index');

  const faviconPath = `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${favicon}`)}`;
  const appleIconPath = `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${appleIcon}`)}`;

  const { content_code: paywallStatus } = contentRestrictions || {};
  // return page content metadata values
  return {
    url,
    contentId,
    typeOfPage,
    pageContentType,
    isWrap,
    environ,
    topics,
    firstPublishDateConverted,
    title,
    seoTitle,
    description: desc,
    articleDesc,
    site,
    promoItems,
    credits,
    initialPublishDate,
    dateModified,
    topSection,
    secondarySection,
    topSectionName,
    isNonContentPage,
    faviconPath,
    appleIconPath,
    nonPrimarySet,
    isOpinion,
    blogName,
    paywallStatus,
    syndication,
    noIndex,
  };
};

export default getContentMeta;
