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
    source_type: sourceType,
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
    paywallStatus,
  } = contentMeta || {};
  const siteDomain = siteDomainURL || `https://www.${site}.com`;
  const replaceQuotes = text => text.replace(/"/g, "'");
  if (isAmp) {
    const { ampGtmTriggers, ampGtmID } = metrics || {};
    const {
      loginStart,
      loginFailed,
      loginAborted,
      loginComplete,
      logoutStart,
      logoutComplete,
    } = ampGtmTriggers || {};
    return (
      <amp-analytics
        config={`https://www.googletagmanager.com/amp.json?id=${ampGtmID}&gtm.url=SOURCE_URL`}
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
              "pageTitle": "${seoTitle ? replaceQuotes(seoTitle).toLowerCase() : replaceQuotes(pageTitle).toLowerCase()}",
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
              "contentPaywallStatus": "${paywallStatus || contentCode || 'free'}",
              "chartbeatTitle": "${replaceQuotes(pageTitle)}"
            },
            "triggers": {
              "accessLoginStarted": {
                "on": "access-login-loginEmbedded-started",
                "request": "${loginStart}",
                "vars": {
                  "event_name": "loginEvent_start",
                  "event_category": "user registration",
                  "event_action": "login start",
                  "event_label": "log in"
                }
              },
              "accessLoginSuccess": {
                "on": "access-login-loginEmbedded-success",
                "request": "${loginComplete}",
                "vars": {
                  "event_name": "loginEvent_complete",
                  "event_category": "user registration",
                  "event_action": "login complete",
                  "event_label": "log in",
                  "userData": {
                    "userProfileID": "AUTHDATA(RegistrationId)"
                  }
                }
              },
              "accessLoginFailed": {
                "on": "access-login-loginEmbedded-failed",
                "request": "${loginFailed}",
                "vars": {
                  "event_name": "loginEvent_failed",
                  "event_category": "user registration",
                  "event_action": "login failed",
                  "event_label": "log in"
                }
              },
              "accessLoginRejected": {
                "on": "access-login-loginEmbedded-rejected",
                "request": "${loginAborted}",
                "vars": {
                  "event_name": "loginEvent_aborted",
                  "event_category": "user registration",
                  "event_action": "login aborted",
                  "event_label": "log in"
                }
              },
              "accessLogoutStarted": {
                "on": "access-login-logoutEmbedded-started",
                "request": "${logoutStart}",
                "vars": {
                  "event_name": "logoutEvent_start",
                  "event_category": "user registration",
                  "event_action": "logout start",
                  "event_label": "log out start"
                }
              },
              "accessLogoutSuccess": {
                "on": "access-login-logoutEmbedded-success",
                "request": "${logoutComplete}",
                "vars": {
                  "event_name": "logoutEvent_complete",
                  "event_category": "user registration",
                  "event_action": "logout complete",
                  "event_label": "log out complete"
                }
              }
            }
          }`,
        }}></script>
    </amp-analytics>
    );
  }

  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        const initialDataObj = {
          "connextActive": "${connextIsEnabled}",
          "pageData": {
            "pageName": "${url}",
            "pageURL": "${url.indexOf('http:') > -1 || url.indexOf('https:') > -1 ? '' : siteDomain}${url}",
            "pageSiteSection": "${topSection}",
            "pageMainlSection": "${topSection}",
            "pageCategory": "${nonPrimarySections}",
            "pageContentType": "${pageContentType || typeOfPage}",
            "pageTitle": "${seoTitle ? replaceQuotes(seoTitle) : replaceQuotes(pageTitle)}",
            "chartbeatTitle": "${replaceQuotes(pageTitle)}"
          },
          "siteData": {
            "siteID": "${metrics && metrics.siteID ? metrics.siteID : site}",
            "siteDomain": "${currentEnv === 'sandbox' ? 'sandbox.' : ''}${siteDomain.replace('https://www.', '')}",
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
            "galleryName": "${replaceQuotes(galleryHeadline)}",
            "contentPaywallStatus": "${paywallStatus || contentCode || 'free'}"
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
