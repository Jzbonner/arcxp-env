import React from 'react';
import { useAppContext } from 'fusion:context';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';
import getContentMeta from './_helper_functions/getContentMeta';

const SiteMetaAmp = () => {
  const appContext = useAppContext();
  const {
    deployment,
    contextPath,
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
  } = contentMeta || {};
  const isNativoLandingPage = url === '/native/';

  let pageTitle = seoTitle;
  if (!seoTitle) pageTitle = title;

  return (
    <>
      <link rel="apple-touch-icon" href={deployment(`${contextPath}/resources/images/favicon-apple-touch-icon.png`)} />
      <link rel="shortcut icon" href={deployment(`${contextPath}/resources/images/favicon.ico`)} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumbnailImage} />
      <meta name="twitter:site" content={`@${site}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta property="og:image" content={thumbnailImage} />
      <meta property="og:image:height" content={`${isNonContentPage
        || thumbnailImage.indexOf('/resources/images/') > -1 ? '200' : '630'}`} />
      <meta property="og:image:width" content={`${isNonContentPage
        || thumbnailImage.indexOf('/resources/images/') > -1 ? '200' : '1200'}`} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={`${isNonContentPage ? 'website' : 'article'}`} />
      {!isNativoLandingPage && <meta property="og:url" content={url} />}
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={site} />
      <title>{pageTitle}</title>
      <meta name="thumbnail" content={thumbnailImage} />
      <meta name="language" content="English" />
    </>
  );
};

export default SiteMetaAmp;