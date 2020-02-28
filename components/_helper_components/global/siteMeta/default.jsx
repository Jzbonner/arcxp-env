import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';

const SiteMeta = () => {
  const appContext = useAppContext();
  const {
    globalContent,
    deployment,
    contextPath,
  } = appContext;
  const {
    headlines, description, canonical_url: canonicalURL, type,
  } = globalContent || {};

  const { siteName, homeURL } = getProperties();
  const homeAndSection = type === ('home' || 'section' || 'page');
  const site = siteName.toLowerCase();
  const thumbnailImage = renderImage();

  return (
    <>
      <link rel="apple-touch-icon" href={deployment(`${contextPath}/resources/images/favicon-apple-touch-icon.png`)} />
      <link rel="shortcut icon" href={deployment(`${contextPath}/resources/images/favicon.ico`)} />
      <link rel="canonical" href={`${type === 'home' ? homeURL : canonicalURL}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description.basic} />
      <meta name="twitter:image" content={thumbnailImage} />
      <meta name="twitter:site" content={`@${site}`} />
      <meta name="twitter:title" content={headlines.basic} />
      <meta name="twitter:url" content={`${type === 'home' ? homeURL : canonicalURL}`} />
      <meta property="og:image" content={thumbnailImage} />
      <meta property="og:image:height" content={`${homeAndSection || thumbnailImage.indexOf('/resources/images/') > -1 ? '200' : '526'}`} />
      <meta property="og:image:width" content={`${homeAndSection || thumbnailImage.indexOf('/resources/images/') > -1 ? '200' : '1000'}`} />
      <meta property="og:title" content={headlines.basic} />
      <meta property="og:type" content={`${homeAndSection ? 'website' : 'article'}`} />
      <meta property="og:url" content={`${type === 'home' ? homeURL : canonicalURL}`} />
      <meta property="og:description" content={description.basic} />
      <meta property="og:site_name" content={siteName} />
      <title>{headlines.basic}</title>
      <meta name="thumbnail" content={thumbnailImage} />
      <meta name="language" content="English" />
    </>
  );
};

export default SiteMeta;
