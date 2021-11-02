import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext, useAppContext } from 'fusion:context';
import fetchEnv from '../../global/utils/environment';
import getContentMeta from '../../global/siteMeta/_helper_functions/getContentMeta';

const GoogleStructuredData = (props) => {
  const contentMeta = getContentMeta();
  if (!contentMeta) {
    return null;
  }
  const { contextPath, deployment } = props || {};
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const appContext = useAppContext();
  const { requestUri } = appContext;

  const {
    websiteLogo, orgName, siteName, googleLogo,
  } = getProperties(arcSite);
  let websiteURL;
  const env = fetchEnv();
  const site = siteName.replace(/-/g, '').toLowerCase();
  if (env === 'prod') {
    websiteURL = `https://${site}.com`;
  } else if (env !== 'prod') {
    websiteURL = `https://${env}.${site}.com`;
  }

  const {
    pageIsLive, title, pageContentType, initialPublishDate, url, topSectionName, promoItems, credits,
    dateModified, articleDesc, metaTitle, metaDescription, stories, coverageEndTime,
  } = contentMeta;

  const formatDateTime = (date) => {
    // Need to manually convert to EST because new Date() in Fusion returns UTC time instead of local time.
    const utcDate = new Date(date);
    const localDateTimeString = utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' });
    const localDate = new Date(localDateTimeString);
    const month = `${localDate.getMonth() + 1}`.padStart(2, '0');
    const timeZoneOffset = utcDate.getHours() - localDate.getHours();
    return `${localDate.getFullYear()}-${month}-${localDate.getDate()}T${localDate.getHours()}:${localDate.getMinutes()}:${localDate.getSeconds()}-0${timeZoneOffset}:00`;
  };

  if (pageIsLive === 'true' || pageIsLive === 'yes') {
    const scriptData = {
      '@context': 'http://schema.org',
      '@type': 'LiveBlogPosting',
      '@id': `${websiteURL}${requestUri}`,
      inLanguage: 'en_US',
      about: {
        '@type': 'Event',
        startDate: formatDateTime(stories[0]?.storyDateModified),
        name: metaTitle,
      },
      location: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Atlanta',
          addressRegion: 'GA',
          addressCountry: 'US',
        },
      },
      coverageStartTime: formatDateTime(stories[0]?.storyDateModified),
      coverageEndTime,
      headline: metaTitle,
      description: metaDescription,
      liveBlogUpdate: stories.map((story) => {
        const {
          storyTitle, storyInitialPublishDate, storyPromoItems, storyCredits, storyInitialBodyText,
        } = story;

        const { url: featuredIMG } = storyPromoItems && storyPromoItems.basic && storyPromoItems.basic.url ? storyPromoItems.basic : {};
        const { url: videoThumbnail } = storyPromoItems
        && storyPromoItems.lead_art && storyPromoItems.lead_art.promo_image ? storyPromoItems.lead_art.promo_image : {};
        const { url: galleryThumbnail } = storyPromoItems && storyPromoItems.basic && storyPromoItems.basic.promo_items && storyPromoItems.basic.promo_items.basic
          ? storyPromoItems.basic.promo_items.basic
          : {};

        // image priority: featured image, video thumb, gallery thumb, logo
        let articleIMG = featuredIMG || videoThumbnail || galleryThumbnail || websiteLogo || '';
        if (articleIMG.indexOf('/resources/') > -1) {
          articleIMG = `${websiteURL}${deployment(`${contextPath}${articleIMG}`)}`;
        }
        // if multiple authors are listed, display all of them
        let author;
        if (storyCredits?.by?.length > 1) {
          author = storyCredits.by.map(eachAuthor => eachAuthor.name).join(', ');
        } else {
          author = storyCredits?.by[0]?.name;
        }

        return {
          '@type': 'BlogPosting',
          datePublished: formatDateTime(storyInitialPublishDate),
          headline: storyTitle,
          author: {
            '@type': 'Person',
            name: author,
          },
          image: {
            '@type': 'ImageObject',
            url: articleIMG,
          },
          articleBody: storyInitialBodyText,
        };
      }),
    };

    return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${JSON.stringify(scriptData)}`,
          }}
        ></script>
    );
  }

  if (pageContentType === 'article' || pageContentType === 'wire' || pageContentType === 'blog') {
    const desc = articleDesc && articleDesc.basic ? articleDesc.basic : '';
    const publisherLogo = `${websiteURL}${deployment(`${contextPath}${googleLogo}`)}`;

    const { url: featuredIMG } = promoItems && promoItems.basic && promoItems.basic.url ? promoItems.basic : {};
    const { url: videoThumbnail } = promoItems
    && promoItems.lead_art && promoItems.lead_art.promo_image ? promoItems.lead_art.promo_image : {};
    const { url: galleryThumbnail } = promoItems && promoItems.basic && promoItems.basic.promo_items && promoItems.basic.promo_items.basic
      ? promoItems.basic.promo_items.basic
      : {};
    // image priority: featured image, video thumb, gallery thumb, logo
    let articleIMG = featuredIMG || videoThumbnail || galleryThumbnail || websiteLogo;
    if (articleIMG.indexOf('/resources/') > -1) {
      articleIMG = `${websiteURL}${deployment(`${contextPath}${articleIMG}`)}`;
    }
    // if multiple authors are listed, display all of them
    let author;
    if (credits && credits.by && credits.by.length > 1) {
      author = credits.by.map(eachAuthor => eachAuthor.name).join(', ');
    } else {
      author = credits && credits.by && credits.by[0] ? credits.by[0].name : null;
      // has to be null if none, otherwise throws an error if left as an empty string
    }

    const scriptData = {
      '@context': 'http://schema.org',
      '@type': 'NewsArticle',
      inLanguage: 'en_US',
      mainEntityofPage: {
        '@type': 'WebPage',
        '@id': `${websiteURL}${url}`,
      },
      publisher: {
        '@type': 'Organization',
        name: `${orgName}`,
        logo: {
          '@type': 'ImageObject',
          url: `${publisherLogo}`,
        },
      },
      articleSection: `${topSectionName}`,
      headline: `${title}`,
      datePublished: `${initialPublishDate}`,
      dateModified: `${dateModified}`,
      author: {
        '@type': 'Person',
        name: `${author}`,
      },
      image: {
        '@type': 'ImageObject',
        url: `${articleIMG}`,
      },
      description: `${desc}`,
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `${JSON.stringify(scriptData)}`,
        }}
      ></script>
    );
  }
  return null;
};

GoogleStructuredData.propTypes = {
  contextPath: PropTypes.string,
  deployment: PropTypes.func,
};

export default GoogleStructuredData;
