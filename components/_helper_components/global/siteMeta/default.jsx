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
    metaValue,
  } = appContext;
  const {
    headlines,
    description,
    canonical_url: canonicalURL,
    type,
    data: contentData,
  } = globalContent || {};
  const { siteName } = getProperties();
  let uri = requestUri;
  if (!canonicalURL) {
    // only jump through these hoops if canonical_url is undefined (i.e. pagebuilder pages)
    // remove query string & hashes from uri
    uri = uri.replace(/\?.*/g, '');
    uri = uri.replace(/#.*/g, '');
  }
  const url = canonicalURL || uri;
  const isNativoLandingPage = url === '/native/';
  const pageType = checkPageType(type, layout);
  const { isNonContentPage } = pageType || {};
  const thumbnailImage = renderImage();
  let site = siteName ? siteName.toLowerCase() : '';
  let title = headlines ? headlines.basic : metaValue('title') || siteName;
  let desc = description ? description.basic : metaValue('description') || '';
  if (contentData) {
    // it's a list or list-type page, let's re-set some values
    const {
      name,
      canonical_website: canonicalSite,
      description: contentDesc,
    } = contentData || {};
    title = name;
    if (contentDesc) {
      desc = contentDesc;
    }
    site = canonicalSite;
  }

  return (
    <>
      <link rel="apple-touch-icon" href={deployment(`${contextPath}/resources/images/favicon-apple-touch-icon.png`)} />
      <link rel="shortcut icon" href={deployment(`${contextPath}/resources/images/favicon.ico`)} />
      {!isNativoLandingPage && <link rel="canonical" href={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={desc} />
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
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content={siteName} />
      <title>{title}</title>
      <meta name="thumbnail" content={thumbnailImage} />
      <meta name="language" content="English" />
    </>
  );
};

export default SiteMeta;
