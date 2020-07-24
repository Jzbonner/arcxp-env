import React from 'react';
import { useAppContext } from 'fusion:context';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';
import getContentMeta from '../siteMeta/_helper_functions/getContentMeta';

const SiteMeta = () => {
  const appContext = useAppContext();
  const {
    deployment,
    contextPath,
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
    favicon,
    isOpinion,
  } = contentMeta || {};
  const isNativoLandingPage = url === '/native/';

  let pageTitle = seoTitle;
  if (!seoTitle) pageTitle = title;

  return (
    <>
      <link rel="apple-touch-icon" href={deployment(`${contextPath}/resources/images/favicon-apple-touch-icon.png`)} />
      <link rel="shortcut icon" href={deployment(`${contextPath}${favicon}`)} />
      {!isNativoLandingPage && <link rel="canonical" href={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumbnailImage} />
      <meta name="twitter:site" content={`@${site}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta property="og:image" content={thumbnailImage} />
      <meta property="og:image:height" content={`${thumbnailImage.indexOf('/resources/logos/') > -1 ? '200' : '630'}`} />
      <meta property="og:image:width" content={`${thumbnailImage.indexOf('/resources/logos/') > -1
        ? '200' : '1200'}`} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={`${isNonContentPage ? 'website' : 'article'}`} />
      {!isNativoLandingPage && <meta property="og:url" content={url} />}
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={site} />
      <title>{pageTitle}</title>
      <meta name="thumbnail" content={thumbnailImage} />
      <meta name="language" content="English" />
      {!isNonContentPage && <meta property="article:opinion" content={isOpinion.toString()} />}
      {metaValue('topics') && <meta name="topics" content={metaValue('topics')} />}
    </>
  );
};

export default SiteMeta;
