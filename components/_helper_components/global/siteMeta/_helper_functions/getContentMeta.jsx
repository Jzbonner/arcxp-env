import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getDomain from '../../../../layouts/_helper_functions/getDomain';
import checkPageType from '../../../../layouts/_helper_functions/getPageType.js';
import fetchEnv from '../../utils/environment.js';
import getPaywallStatus from './getPaywallStatus';
import { formatTime, formatDate } from '../../../article/timestamp/_helper_functions/computeTimeStamp';

const getContentMeta = () => {
  const appContext = useAppContext();
  const {
    arcSite,
    globalContent,
    layout,
    metaValue,
    requestUri,
    template,
    deployment,
    contextPath,
    renderables: renderedOutput,
  } = appContext;
  const blogName = metaValue('blogname');
  const noIndex = metaValue('no index');
  const darkMode = metaValue('dark mode') === 'true';
  const inMemoriam = metaValue('in-memoriam') === 'true';
  const darkHeaderFooter = metaValue('dark header footer') === 'true';
  const pageIsLive = metaValue('live');
  const pbPaywall = metaValue('story-meter');
  const metaTitle = metaValue('title');
  const metaDescription = metaValue('description');
  const sophiType = metaValue('sophi-type');
  const treatPbPageAsArticle = sophiType === 'article';
  const {
    siteName, favicon, cdnSite, appleIcon, cdnOrg,
  } = getProperties(arcSite) || {};
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
      if (tag && tag.name) {
        topics.push(tag.name.replace(/"/g, ''));
      } else if (tag && tag.text) {
        topics.push(tag.text.replace(/"/g, ''));
      }
    });
  }
  const pagebuilderTopics = metaValue('topics') || [];
  if (pagebuilderTopics.length) {
    topics = [...topics, ...pagebuilderTopics.trim().replace(/"/g, '').replace(/\s*,\s*/ig, ',').split(',')];
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
  const contentType = type === 'video' ? type : (subtype || type);
  const pageType = checkPageType(contentType, layout, renderedOutput);
  const {
    isHome,
    isSection,
    isWrap,
    isStaff,
    isWeather,
    isError,
    isList,
    isLiveUpdate,
    isAuthor,
    isTraffic,
    isEnhancedList,
    isNonContentPage,
  } = pageType || {};
  let { type: typeOfPage } = pageType || {};
  let pageContentType = typeOfPage === 'story' ? 'article' : typeOfPage && typeOfPage.toLowerCase();
  if (treatPbPageAsArticle) {
    pageContentType = 'article';
  } else if (isHome) {
    pageContentType = 'homepage';
  } else if (isError) {
    pageContentType = '404';
  } else if (isLiveUpdate) {
    pageContentType = 'liveupdates';
  } else if (isAuthor) {
    pageContentType = 'author';
  } else if (isEnhancedList || isList) {
    pageContentType = 'list';
  } else if (isStaff) {
    pageContentType = 'staff';
  } else if (isWeather) {
    pageContentType = 'weather';
  } else if (isTraffic) {
    pageContentType = 'traffic';
  } else if (isSection) {
    pageContentType = 'section front';
  }
  if (pageIsLive) {
    // placeholder logic for liveupdates categorization
    typeOfPage = 'liveupdates';
    pageContentType = 'liveupdates';
  }
  let topSection = primarySectionId;
  let secondarySection = '';
  if (!primarySection && nonPrimarySet.length) {
    // there is no primary section, so take the first non-primary section (e.g. galleries)
    const nonPrimaries = typeof nonPrimarySet === 'string' ? nonPrimarySet.split(',') : nonPrimarySet;
    const { 0: firstSecondarySection } = nonPrimaries || [];
    topSection = firstSecondarySection;
  } else if (!primarySection) {
    // there are no primary or secondary sections, so it's likely a pagebuilder page (without a true "section" associated)... build the "section" from the uri
    topSection = requestUri;
    const queryStringIndex = topSection.indexOf('?');
    if (queryStringIndex > -1) {
      topSection = topSection.substr(0, queryStringIndex);
    }
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
  /*
    if a canonical meta value is defined in PB, defer to it.  This is especially important/necessary for A/B tests, where the "B" test has its own unique requestUri (because it's a separate page in PB) but we want to ensure its metadata matches the "A" page (i.e. url in the browser).  Otherwise, use the requestUri.
  */
  let uri = metaValue('canonical') || requestUri;
  if ((!canonicalUrl || treatPbPageAsArticle) && uri) {
    /*
      only jump through these hoops if canonical_url is undefined (i.e. pagebuilder pages) or we want to treat the PB page as an article (e.g. Covid, Stop the Steal, etc)
    */
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
  const url = newCanonicalUrl || (treatPbPageAsArticle ? uri : canonicalUrl) || uri;
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

  const getInitialBodyText = (contentEls) => {
    if (Array.isArray(contentEls)) {
      return contentEls.reduce((accumulator, el) => {
        if (el.type === 'text' && accumulator.length < 200) {
          return accumulator + el.content;
        }
        return accumulator;
      }, '');
    }
    return '';
  };

  const stories = Array.isArray(globalContent) && globalContent.map(content => ({
    /* eslint-disable camelcase */
    storyTitle: content?.headlines?.basic,
    storyInitialPublishDate: content?.first_publish_date,
    storyDateModified: content?.display_date,
    storyPromoItems: content?.promo_items,
    storyCredits: content?.credits,
    storyInitialBodyText: getInitialBodyText(content?.content_elements),
    storyId: content?._id,
    /* eslint-enable camelcase */
  })).reverse();

  const faviconPath = `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${favicon}`)}`;
  const appleIconPath = `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${appleIcon}`)}`;

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
    firstPublishDate,
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
    isABTest: metaValue('AB test'),
    blogName,
    paywallStatus: pbPaywall || getPaywallStatus(),
    syndication,
    noIndex,
    darkMode,
    inMemoriam,
    darkHeaderFooter,
    pageIsLive,
    metaTitle,
    metaDescription,
    stories,
    sophiType,
    treatPbPageAsArticle,
  };
};

export default getContentMeta;
