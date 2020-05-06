import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import checkPageType from '../../../layouts/_helper_functions/getPageType.js';

const getAdTargeting = (slotName, siteName, currentEnv) => {
  const appContext = useAppContext();
  const {
    globalContent,
    layout,
    requestUri,
    template,
  } = appContext;
  const {
    _id: uuid,
    subtype,
    type,
    taxonomy,
    data: contentData,
  } = globalContent || {};
  const { tags = [] } = taxonomy || {};
  const targetingTopics = [];
  tags.forEach((tag) => {
    if (tag && tag.text) {
      targetingTopics.push(tag.text);
    }
  });

  const pageType = checkPageType(subtype || type, layout);
  const {
    isHome,
    isSection,
    type: typeOfPage,
  } = pageType || {};
  let contentType = typeOfPage === 'story' ? 'article' : typeOfPage.toLowerCase();
  if (isHome) {
    contentType = 'homepage';
  } else if (isSection) {
    contentType = 'sectionPage';
  }

  let environ = currentEnv;
  if (requestUri && requestUri.indexOf('?') > -1) {
    // there is a query string, let's see if it includes "testads"
    const queryString = requestUri.substring(requestUri.indexOf('?'));
    if (queryString.indexOf('testads') > -1) {
      // "testads" exists, let's (re)set the "environ" value
      environ = 'debug';
    }
  }
  let contentId = uuid;
  if (contentData) {
    // it's a list or list-type page
    const { id } = contentData || {};
    contentId = id;
  }
  if (template.indexOf('page/') > -1) {
    // it's a pagebuilder page, so grab & update the id
    const pageId = template.replace('page/', '');
    if (pageId !== '') {
      contentId = pageId;
    }
  }
  // define global targeting values
  return {
    uuid: contentId,
    obj_type: contentType,
    environ,
    mediaType: 'Arc',
    sitepath: siteName.toLowerCase(),
    ad_slot: slotName,
    topics: targetingTopics,
  };
};

getAdTargeting.propTypes = {
  slotName: PropTypes.string,
  siteName: PropTypes.string,
  currentEnv: PropTypes.string,
};

export default getAdTargeting;
