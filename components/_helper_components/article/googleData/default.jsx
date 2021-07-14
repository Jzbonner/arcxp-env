import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import fetchEnv from '../../global/utils/environment';
import getContentMeta from '../../global/siteMeta/_helper_functions/getContentMeta';

const GoogleStructuredData = () => {
  const contentMeta = getContentMeta();
  if (!contentMeta) {
    return null;
  }
  const {
    title, pageContentType, initialPublishDate, url, topSectionName, promoItems, credits, dateModified, articleDesc,
  } = contentMeta;

  if (pageContentType === 'article' || pageContentType === 'wire' || pageContentType === 'blog') {
    const fusionContext = useFusionContext();
    const { arcSite } = fusionContext;
    const env = fetchEnv();
    const desc = articleDesc && articleDesc.basic ? articleDesc.basic : '';
    const {
      websiteLogo, orgName, cdnOrg, siteName, googleLogo,
    } = getProperties(arcSite);
    let websiteURL;
    const site = siteName.toLowerCase();

    if (env === 'prod') {
      websiteURL = `https://${site}.com`;
    } else if (env !== 'prod') {
      websiteURL = `https://${cdnOrg}-${site}-${env}.cdn.arcpublishing.com`;
    }

    const { url: featuredIMG } = promoItems && promoItems.basic && promoItems.basic.url ? promoItems.basic : {};
    const { url: videoThumbnail } = promoItems
    && promoItems.lead_art && promoItems.lead_art.promo_image ? promoItems.lead_art.promo_image : {};
    const { url: galleryThumbnail } = promoItems && promoItems.basic && promoItems.basic.promo_items && promoItems.basic.promo_items.basic
      ? promoItems.basic.promo_items.basic
      : {};
    // image priority: featured image, video thumb, gallery thumb, logo
    const articleIMG = featuredIMG || videoThumbnail || galleryThumbnail || websiteLogo;
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
          url: `${googleLogo}`,
        },
      },
      articleSection: `${topSectionName}`,
      headline: `${title}`,
      datePublished: `${initialPublishDate}`,
      dateModified: `${dateModified}`,
      author: {
        '@type': 'Organization',
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

export default GoogleStructuredData;
