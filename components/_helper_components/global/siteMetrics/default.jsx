import React from 'react';
import { useAppContext } from 'fusion:context';
import { connext, metrics } from 'fusion:environment';
import getProperties from 'fusion:properties';
import checkPageType from '../../../layouts/_helper_functions/getPageType.js';

const SiteMetrics = () => {
  const appContext = useAppContext();
  const { globalContent, layout, metaValue } = appContext;
  const { headlines, type } = globalContent || {};

  const pageType = checkPageType(type, layout);
  const { isHomeOrSectionPage, isHome, isSection } = pageType || {};
  let pageContentType = type;
  if (isHome) {
    pageContentType = 'homepage';
  } else if (isSection) {
    pageContentType = 'section front';
  }

  const { siteName } = getProperties();

  const site = siteName.toLowerCase();
  const title = headlines ? headlines.basic : metaValue('title') || siteName;

  return (
    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: `var DDO = DDO || {};
        DDO.DTMLibraryURL = '${metrics && metrics.dtmLibraryURL ? metrics.dtmLibraryURL : ''}';

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

        DDO.pageData: {
          'pageName': '${isHomeOrSectionPage ? 'website' : 'article'}',
          'pageSiteSection': '<string>',
          'pageCategory': '<string>',
          'pageSubCategory': '<string>',
          'pageContentType': '${pageContentType}',
          'pageTitle': '${title.replace('\'', '"')}'
        };

        DDO.siteData: {
          'siteID': '${site}',
          'siteDomain': '<string>',
          'siteVersion': 'responsive site',
          'siteFormat': '<string>',
          'siteMetro': '<string>',
          'siteMedium': 'np',
          'siteType': '',
          'siteCMS': 'arc'
        };

        DDO.contentData: {
          'contentTopics': '<string>',
          'contentByline': '<string>',
          'contentOriginatingSite': '<string>',
          'contentID': '<string>',
          'contentVendor': '<string>',
          'contentPublishDate': '<string>',
          'blogName': '<string>',
          'galleryName': '<string>'
        };
        DDO.userData: {
          'userStatus': '<string>',
          'userProfileID': '<string>',
          'userType': '<string>',
          'userActive': '<string>'
        };

        DDO.eventData: {
          'action': '<string>'
        };
      `,
    }}></script>
  );
};

export default SiteMetrics;
