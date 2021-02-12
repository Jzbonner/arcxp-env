import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext, useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getContentMeta from '../siteMeta/_helper_functions/getContentMeta';
import fetchEnv from '../utils/environment';

const SiteMetrics = ({ isAmp }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const appContext = useAppContext();
  const { globalContent } = appContext;
  const {
    source,
    credits,
    type: contentType,
    promo_items: promoItems,
    headlines: contentHeadlines,
    content_restrictions: contentRestrictions,
  } = globalContent || {};

  const { content_code: contentCode } = contentRestrictions || {};

  const { basic = {} } = promoItems || {};
  const { headlines: promoHeadlines } = basic;
  const { type: promoType = '' } = basic || {};

  const { by: authorData } = credits || {};
  const {
    system: sourceSystem,
    type: sourceType,
  } = source || {};
  const authors = [];
  const ampAuthors = [];
  const ampAuthorNames = [];
  let galleryHeadline = '';

  if (authorData) {
    authorData.forEach((author) => {
      const { _id: authorID, name: authorName = '', type } = author || {};
      if (isAmp) {
        // eslint-disable-next-line quote-props
        ampAuthors.push(`{ "_id": "${authorID}", "name": "${authorName}", "type": "${type}"}`);
        ampAuthorNames.push(`"${authorName.toLowerCase()}"`);
      }
      // eslint-disable-next-line no-useless-escape
      authors.push(authorName.toLowerCase().replace(/'/g, "\'"));
    });
  }

  if (contentType === 'gallery') {
    galleryHeadline = contentHeadlines && contentHeadlines.basic ? contentHeadlines.basic : '';
  } else if (promoType === 'gallery') {
    galleryHeadline = promoHeadlines && promoHeadlines.basic ? promoHeadlines.basic : '';
  }

  const { metrics, siteDomainURL, connext } = getProperties(arcSite) || {};
  const currentEnv = fetchEnv();
  const { isEnabled: connextIsEnabled = false } = connext[currentEnv] || {};
  const contentMeta = getContentMeta();

  if (!contentMeta) {
    return null;
  }

  const {
    url,
    topSection,
    topSectionName,
    pageContentType,
    typeOfPage,
    site,
    title: pageTitle = '',
    seoTitle,
    topics,
    contentId,
    firstPublishDateConverted,
    nonPrimarySet: nonPrimarySections,
    blogName = '',
  } = contentMeta || {};
  const siteDomain = siteDomainURL || `https://www.${site}.com`;
  if (isAmp) {
    return (
      <amp-analytics
        config={`https://www.googletagmanager.com/amp.json?id=${metrics.ampGtmID}&gtm.url=SOURCE_URL`}
        data-credentials='include'>
        <script type='application/json' dangerouslySetInnerHTML={{
          __html: `{
            "vars": {
              "authors": [${ampAuthors}],
              "canonicalUrl": "${url}",
              "groups": "default",
              "pageName": "${url}",
              "pageSiteSection": "${topSection}",
              "pageCategory": "${nonPrimarySections}",
              "pageContentType": "instant article",
              "pageTitle": "${seoTitle ? seoTitle.replace(/"/g, "'").toLowerCase() : pageTitle.replace(/"/g, "'").toLowerCase()}",
              "pageFlow": "",
              "pageNumber": "",
              "siteVersion": "instant",
              "siteDomain": "${siteDomain.replace('https://www.', '')}",
              "siteMetro": "${metrics && metrics.siteMetro ? metrics.siteMetro : ''}",
              "siteFormat": "${metrics && metrics.siteFormat ? metrics.siteFormat : 'news'}",
              "siteMedium": "np",
              "siteID": "${metrics && metrics.siteID ? metrics.siteID : site}",
              "siteType": "free",
              "siteCMS": "arc",
              "contentTopics": "${topics.join().toLowerCase()}",
              "contentByline": "${authors.join() || undefined}",
              "contentOriginatingSite": "${metrics && metrics.siteID ? metrics.siteID : site}",
              "contentID": "${contentId || ''}",
              "contentVendor": "${sourceType && sourceType === 'wires' && sourceSystem ? sourceSystem.toLowerCase() : ''}",
              "contentPublishDate": "${firstPublishDateConverted}",
              "blogName": "${pageContentType === 'blog' ? topSectionName : (blogName || '')}",
              "galleryName": "${galleryHeadline}",
              "authorName": [${ampAuthorNames}],
              "pageNameStr": "",
              "pageUrlStr": "",
              "pageMainSection": "${topSection}",
              "contentPaywallStatus": "${contentCode}",
              "userData": {
                "userProfileID": "AUTHDATA(RegistrationId)"
              }
            },
            "triggers": {
              "accessLoginStarted": {
                "on": "access-login-loginEmbedded-started",
                "request": "event",
                "vars": {
                  "event_name": "loginEvent_start",
                  "event_category": "user registration",
                  "event_action": "login start",
                  "event_label": "log in"
                }
              },
              "accessLoginSuccess": {
                "on": "access-login-loginEmbedded-success",
                "request": "event",
                "vars": {
                  "event_name": "loginEvent_complete",
                  "event_category": "user registration",
                  "event_action": "login complete",
                  "event_label": "log in"
                }
              },
              "accessLoginSuccess": {
                "on": "access-login-logoutEmbedded-success",
                "request": "event",
                "vars": {
                  "event_name": "loginEvent_logout",
                  "event_category": "user registration",
                  "event_action": "logout complete",
                  "event_label": "log in"
                }
              }
            }
          }`,
        }}></script>
    </amp-analytics>
    );
  }

  return (
    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: `
        const initialDataObj = {
          "connextActive": "${connextIsEnabled}",
          "pageData": {
            "pageName": "${url}",
            "pageURL": "${siteDomain}${url}",
            "pageSiteSection": "${topSection}",
            "pageMainSection": "${topSection}",
            "pageCategory": "${nonPrimarySections}",
            "pageContentType": "${typeOfPage || pageContentType}",
            "pageTitle": "${seoTitle ? seoTitle.replace(/"/g, "'") : pageTitle.replace(/"/g, "'")}"
          },
          "siteData": {
            "siteID": "${metrics && metrics.siteID ? metrics.siteID : site}",
            "siteDomain": "${siteDomain.replace('https://www.', '')}",
            "siteVersion": "responsive site",
            "siteFormat": "${metrics && metrics.siteFormat ? metrics.siteFormat : 'news'}",
            "siteMetro": "${metrics && metrics.siteMetro ? metrics.siteMetro : ''}",
            "siteMedium": "np",
            "siteType": "free",
            "siteCMS": "arc"
          },
          "contentData": {
            "contentTopics": "${topics.join()}",
            "contentByline": "${authors.join() || undefined}",
            "contentOriginatingSite": "${metrics && metrics.siteID ? metrics.siteID : site}",
            "contentID": "${contentId || ''}",
            "contentVendor": "${sourceType && sourceType === 'wires' && sourceSystem ? sourceSystem.toLowerCase() : ''}",
            "contentPublishDate": "${firstPublishDateConverted}",
            "blogName": "${pageContentType === 'blog' ? topSectionName : (blogName || '')}",
            "galleryName": "${galleryHeadline.replace(/"/g, "'")}",
            "contentPaywallStatus": "${contentCode}"
          }
        };
        // we do a check just in case dataLayer has already been created
        if (window.dataLayer) {
          dataLayer.push(initialDataObj);
        } else {
          dataLayer = [initialDataObj];
        }
      `,
    }}></script>
  );
};

SiteMetrics.propTypes = {
  isAmp: PropTypes.bool,
};
export default SiteMetrics;
