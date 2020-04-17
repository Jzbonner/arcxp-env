import React from 'react';
import { useAppContext } from 'fusion:context';
import { connext, envMetrics } from 'fusion:environment';
import getProperties from 'fusion:properties';
import checkPageType from '../../../layouts/_helper_functions/getPageType.js';

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
    type,
  } = globalContent || {};

  const { primary_section: section } = taxonomy || {};
  const { _id: primarySectionId, name: primarySectionName, parent_id: parentSectionId } = section || {};
  const isTopMostSection = (primarySectionId === parentSectionId || parentSectionId === '/');
  const topSection = isTopMostSection ? primarySectionName : parentSectionId;
  const secondarySection = isTopMostSection ? '' : primarySectionName;

  const pageType = checkPageType(type, layout);
  const { isHomeOrSectionPage, isHome, isSection } = pageType || {};
  let pageContentType = type;
  if (isHome) {
    pageContentType = 'homepage';
  } else if (isSection) {
    pageContentType = 'section front';
  }

  const { siteName, siteDomainURL, metrics } = getProperties() || {};

  const site = siteName.toLowerCase();
  const title = headlines ? headlines.basic : metaValue('title') || siteName;

  return (
    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: `var DDO = DDO || {};
        DDO.DTMLibraryURL = '${envMetrics && envMetrics.dtmLibraryURL ? envMetrics.dtmLibraryURL : ''}';

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
          'contentTopics': '<string>',
          'contentByline': '<string>',
          'contentOriginatingSite': '<string>',
          'contentID': '${uuid}',
          'contentVendor': '<string>',
          'contentPublishDate': '<string>',
          'blogName': '<string>',
          'galleryName': '<string>'
        };
        DDO.userData = {
          'userStatus': '<string>',
          'userProfileID': '<string>',
          'userType': '<string>',
          'userActive': '<string>'
        };

        DDO.eventData = {
          'action': '<string>'
        };
      `,
    }}></script>
  );
};

export default SiteMetrics;
