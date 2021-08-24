import React from 'react';
import { useAppContext } from 'fusion:context';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';
import getContentMeta from './_helper_functions/getContentMeta';
import handleSiteName from '../../../layouts/_helper_functions/handleSiteName.js';
import { safeHtml } from '../utils/stringUtils';


const SiteMetaAmp = () => {
  const appContext = useAppContext();
  const {
    metaValue,
  } = appContext;

  const thumbnailImage = renderImage();
  const contentMeta = getContentMeta();
  if (!contentMeta) {
    return null;
  }

  const {
    url,
    site,
    title,
    seoTitle,
    description,
    isNonContentPage,
    faviconPath,
    appleIconPath,
    isOpinion,
    paywallStatus,
    noIndex,
  } = contentMeta || {};
  const isNativoLandingPage = url === '/native/';

  const updatedURL = `${url.indexOf('http:') > -1 || url.indexOf('https:') > -1 ? '' : `https://www.${handleSiteName(site)}.com`}${url === '/homepage' || url === '/homepage/' ? '' : url}`;

  let pageTitle = seoTitle;
  if (!seoTitle) pageTitle = title;

  const parsedDescription = safeHtml(description, { whiteList: {} });

  return (
    <>
      <link rel="apple-touch-icon" href={appleIconPath} />
      <link rel="shortcut icon" href={faviconPath} />
      <link rel="canonical" href={updatedURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={parsedDescription} />
      <meta name="twitter:image" content={thumbnailImage} />
      <meta name="twitter:site" content={`@${site}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta property="og:image" content={thumbnailImage} />
      <meta property="og:image:secure_url" content={thumbnailImage} />
      <meta property="og:image:height" content={`${isNonContentPage
        || thumbnailImage.indexOf('/resources/logos/') > -1 ? '200' : '630'}`} />
      <meta property="og:image:width" content={`${isNonContentPage
        || thumbnailImage.indexOf('/resources/logos/') > -1 ? '200' : '1200'}`} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={`${isNonContentPage ? 'website' : 'article'}`} />
      {!isNativoLandingPage && <meta property="og:url" content={url} />}
      <meta property="og:description" content={parsedDescription} />
      <meta property="og:site_name" content={site} />
      <title>{pageTitle}</title>
      <meta name="thumbnail" content={thumbnailImage} />
      <meta name="language" content="English" />
      <meta property="article:opinion" content={isOpinion.toString()} />
      <meta name="story.meter" content={paywallStatus} />
      {metaValue('topics') && <meta name="topics" content={metaValue('topics')} />}
      {noIndex === 'yes' && <meta name="robots" content="noindex" />}
    </>
  );
};

export default SiteMetaAmp;
