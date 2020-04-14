import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';
import checkPageType from '../../../layouts/_helper_functions/getPageType.js';

const SiteMeta = () => {
  const appContext = useAppContext();
  const {
    globalContent,
    deployment,
    contextPath,
    layout,
    requestUri,
  } = appContext;
  const {
    headlines, description, canonical_url: canonicalURL, type,
  } = globalContent || {};
  const { siteName } = getProperties();
  let uri = requestUri;
  if (!canonicalURL) {
    // only jump through these hoops if canonical_url is undefined (i.e. pagebuilder pages)
    if (uri.indexOf('?')) {
      uri = uri.substring(0, uri.indexOf('?'));
    } else if (uri.indexOf('#')) {
      uri = uri.substring(0, uri.indexOf('#'));
    }
  }
  const url = canonicalURL || uri;
  const pageType = checkPageType(type, layout);
  const { isHomeOrSectionPage } = pageType || {};
  const site = siteName.toLowerCase();
  const thumbnailImage = renderImage();
  const title = headlines ? headlines.basic : siteName;
  const desc = description ? description.basic : '';

  return (
    <>
      <link rel="apple-touch-icon" href={deployment(`${contextPath}/resources/images/favicon-apple-touch-icon.png`)} />
      <link rel="shortcut icon" href={deployment(`${contextPath}/resources/images/favicon.ico`)} />
      <link rel="canonical" href={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={thumbnailImage} />
      <meta name="twitter:site" content={`@${site}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta property="og:image" content={thumbnailImage} />
      <meta property="og:image:height" content={`${isHomeOrSectionPage
          || thumbnailImage.indexOf('/resources/images/') > -1 ? '200' : '630'}`} />
      <meta property="og:image:width" content={`${isHomeOrSectionPage
          || thumbnailImage.indexOf('/resources/images/') > -1 ? '200' : '1200'}`} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={`${isHomeOrSectionPage ? 'website' : 'article'}`} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content={siteName} />
      <title>{title}</title>
      <meta name="thumbnail" content={thumbnailImage} />
      <meta name="language" content="English" />
    </>
  );
};

export default SiteMeta;
