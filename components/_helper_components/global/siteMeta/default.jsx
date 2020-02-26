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

  return (
    <>
      <link rel="apple-touch-icon" href={deployment(`${contextPath}/resources/images/favicon-apple-touch-icon.png`)} />
      <link rel="shortcut icon" href={deployment(`${contextPath}/resources/images/favicon.ico`)} />
      <link rel="canonical" href={`${type === 'home' ? homeURL : canonicalURL}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description.basic} />
      <meta name="twitter:image" content={renderImage()} />
      <meta name="twitter:site" content={siteName} />
      <meta name="twitter:title" content={headlines.basic} />
      <meta name="twitter:url" content={`${type === 'home' ? homeURL : canonicalURL}`} />
      <meta property="og:image" content={renderImage()} />
      <meta property="og:image:height" content="200" />
      <meta property="og:image:width" content={`${homeAndSection ? '200' : '800'}`} />
      <meta property="og:title" content={headlines.basic} />
      <meta property="og:type" content={`${homeAndSection ? 'website' : 'article'}`} />
      <meta property="og:url" content={`${type === 'home' ? homeURL : canonicalURL}`} />
      <meta property="og:description" content={description.basic} />
      <meta property="og:site_name" content={siteName} />
      <title>{headlines.basic}</title>
    </>
  );
};

export default SiteMeta;
