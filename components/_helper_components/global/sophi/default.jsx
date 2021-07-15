/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getContentMeta from '../siteMeta/_helper_functions/getContentMeta';
import fetchEnv from '../utils/environment';

const SophiTags = ({ isAmp }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const { metrics } = getProperties(arcSite) || {};
  const currentEnv = fetchEnv();
  const { sophiActive = false } = metrics[currentEnv] || {};
  // sophi is being implemented for AJC only, and must be active
  if (arcSite !== 'ajc' || !sophiActive) return false;
  const sophiEnv = currentEnv !== 'prod' ? 'stg' : 'prod';
  const contentMeta = getContentMeta();

  if (!contentMeta) {
    return null;
  }

  const {
    topSection,
    isNonContentPage,
    contentId,
    initialPublishDate,
    firstPublishDate: lastModifiedDate,
    paywallStatus,
  } = contentMeta || {};
  const sophiContentType = isNonContentPage ? 'section' : 'article';
  let sophiSection = topSection.indexOf('/') === 0 ? topSection.substr(1) : topSection;
  const sophiMainSection = sophiSection.substr(0, sophiSection.indexOf('/'));
  sophiSection = sophiSection.replace(/\//g, ':');

  const accessCategory = paywallStatus === 'premium' ? 'metered views' : 'free access';

  const sophiContentObj = isNonContentPage ? {} : {
    type: `${sophiContentType}`,
    contentId: `${contentId || ''}`,
    accessCategory,
  };
  const sophiPageObj = {
    type: `${sophiContentType}`,
    breadcrumb: `${sophiSection}`,
    sectionName: `${sophiMainSection}`,
    datePublished: `${initialPublishDate}`,
    dateModified: `${lastModifiedDate}`,
  };
  if (isNonContentPage) {
    // it's a non-content page (i.e. home or section) so remove `datePublished` from the page object
    delete sophiPageObj.datePublished;
  }


  if (isAmp) {
    const stringCustomContents = [
      JSON.stringify({
        schema: 'iglu:com.globeandmail/environment/jsonschema/1-0-9',
        data: {
          client: 'ajc',
          environment: `${sophiEnv}`,
        },
      }),
      JSON.stringify({
        schema: 'iglu:com.globeandmail/page/jsonschema/1-0-10',
        data: {
          type: `${sophiContentType}`,
          breadcrumb: `${sophiSection}`,
          sectionName: `${sophiMainSection}`,
          datePublished: `${initialPublishDate}`,
          dateModified: `${lastModifiedDate}`,
        },
      }),
      JSON.stringify({
        schema: 'iglu:com.globeandmail/content/jsonschema/1-0-12',
        data: {
          type: `${sophiContentType}`,
          contentId: `${contentId || ''}`,
        },
      }),
    ].toString();

    return (
      <amp-analytics type="snowplow_v2" id="sophi" data-credentials="include">
        <script type='application/json' dangerouslySetInnerHTML={{
          __html: `{
            "vars": {
              "collectorHost": "collector.sophi.io",
              "appId": "ajc:ajc_com:amp",
              "customContexts": ${JSON.stringify(stringCustomContents)}
            },
            "linkers": {
                "enabled": true,
                "proxyOnly": false,
                "destinationDomains": "ajc.com"
              },
              "triggers": {
                "defaultPageview": {
                  "on": "visible",
                  "request": "pageView"
                },
                "trackFirstPagePing": {
                  "on": "timer",
                  "request": "pagePing",
                  "timerSpec": {
                    "interval": 5,
                    "maxTimerLength": 4.99,
                    "immediate": false,
                    "startSpec": {
                      "on": "visible",
                      "selector": ":root"
                    },
                    "stopSpec": {
                      "on": "hidden",
                      "selector": ":root"
                    }
                  }
                },
                "trackPagePings": {
                  "on": "timer",
                  "request": "pagePing",
                  "timerSpec": {
                    "interval": 20,
                    "maxTimerLength": 1800,
                    "immediate": false,
                    "startSpec": {
                      "on": "visible",
                      "selector": ":root"
                    },
                    "stopSpec": {
                      "on": "hidden",
                      "selector": ":root"
                    }
                  }
                }
              }
            }`,
        }}></script>
      </amp-analytics>
    );
  }

  return (
    <>
      <script type='text/javascript' dangerouslySetInnerHTML={{
        __html: `// Sophi Data and Settings
          try {
            window.sophi = {
              data: {
                page: ${JSON.stringify(sophiPageObj)},
                environment: {
                  environment: "${sophiEnv}",
                  version: "APP_VERSION_string"
                },
                content: ${JSON.stringify(sophiContentObj)}
              },
              settings: {
                collectorEndpoint: 'collector.sophi.io',
                client: "ajc",
                appId: "ajc:ajc_com-website",
                linkedDomains: ["ajc.com"],
                noConfigFile: true,
                plugin: {
                  adblock: false,
                  private: false,
                  video: true
                }
              }
            };
          } catch(e) {}
        `,
      }}></script>
      <script type='text/javascript' dangerouslySetInnerHTML={{
        __html: `// Sophi Tag
          !function(f,g){window.sophi=window.sophi||{};var c=window.sophi;c.q=c.q||[],c.sendEvent=function(a){c.q.push(a)},c.data=c.data||{},c.settings=c.settings||{};var b=c.settings,a;b.trackerName=b.trackerName||"sophiTag";try{window.localStorage&&((a=localStorage.getItem(b.trackerName+".tagCdn"))&&"string"==typeof a&&7<a.length||(a=void 0))}catch(e){a=void 0}b.loadFrom=a?a+"sophi.min.js":b.loadFrom||"https://cdn.sophi.io/latest/sophi.min.js",b.legacy=a?a+"sophi.legacy.min.js":b.loadFrom||"https://cdn.sophi.io/latest/sophi.legacy.min.js";try{eval('let id=Symbol("id"), a=[...new Set([0,1])].includes(0);')}catch(a){b.loadFrom=b.legacy}finally{if(!window[b.trackerName]){a=document.createElement("script");var d=document.getElementsByTagName("script")[0];a.async=1,a.src=b.loadFrom,d.parentNode.insertBefore(a,d)}}c.sendEvent({type:"page_view"})}();
            `,
      }}></script>
    </>
  );
};

SophiTags.propTypes = {
  isAmp: PropTypes.bool,
};
export default SophiTags;
