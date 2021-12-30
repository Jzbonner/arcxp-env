import React from 'react';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';
import getContentMeta from '../siteMeta/_helper_functions/getContentMeta';
import handleSiteName from '../../../layouts/_helper_functions/handleSiteName.js';
import { safeHtml } from '../utils/stringUtils';

const SiteMeta = () => {
  const appContext = useAppContext();
  const {
    metaValue,
  } = appContext;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const siteProps = getProperties(arcSite);
  const { fbAppId } = siteProps || {};

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
    syndication,
    noIndex,
    treatPbPageAsArticle,
  } = contentMeta || {};
  const isNativoLandingPage = url === '/native/';
  const { external_distribution: extDistribution, search: visibleInSearch } = syndication || {};
  const hideArticleFromSearch = !!(syndication && !extDistribution && !visibleInSearch);
  // only add the sitedomain if the url is relative
  const updatedURL = `${url.indexOf('http:') > -1 || url.indexOf('https:') > -1 ? '' : `https://www.${handleSiteName(site)}.com`}${url === '/homepage' || url === '/homepage/' ? '' : url}`;

  let pageTitle = seoTitle;
  if (!seoTitle) pageTitle = title;

  const parsedDescription = safeHtml(description, { whiteList: {} });
  // cap meta description at 150 characters.Google has no limit but recommends <= 150 chars, 160 chars max is what is allowed in video center.
  const metaDescParsed = parsedDescription.substring(0, 150);
  // Page Builder seems to render Page Metadata automatically for pages, here is a conditional check to manually add them for non-pages
  const hasMetaDescription = !!metaValue('description');

  return (
    <>
      <link rel="apple-touch-icon" href={appleIconPath} />
      <link rel="icon" type="image/png" href={faviconPath} />
      <title>{pageTitle}</title>
      {!hasMetaDescription && metaDescParsed ? <meta name="description" content={metaDescParsed} /> : null}
      {!isNativoLandingPage && <link rel="canonical" href={updatedURL} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={parsedDescription} />
      <meta name="twitter:image" content={thumbnailImage} />
      <meta name="twitter:site" content={`@${site}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={updatedURL} />
      <meta property="fb:app_id" content={fbAppId} />
      <meta property="og:image" content={thumbnailImage} />
      <meta property="og:image:secure_url" content={thumbnailImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:height" content={`${thumbnailImage.indexOf('/resources/logos/') > -1 ? '200' : '630'}`} />
      <meta property="og:image:width" content={`${thumbnailImage.indexOf('/resources/logos/') > -1
        ? '200' : '1200'}`} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={`${isNonContentPage ? 'website' : 'article'}`} />
      {!isNativoLandingPage && <meta property="og:url" content={updatedURL} />}
      <meta property="og:description" content={parsedDescription} />
      <meta property="og:site_name" content={site} />
      <meta name="thumbnail" content={thumbnailImage} />
      <meta name="language" content="English" />
      {((!isNonContentPage && hideArticleFromSearch && !treatPbPageAsArticle) || noIndex === 'yes') && <meta name="robots" content="noindex" />}
      {!isNonContentPage && <meta property="article:opinion" content={isOpinion.toString()} />}
      {paywallStatus && <meta name="story.meter" content={paywallStatus} />}
      {metaValue('topics') && <meta name="topics" content={metaValue('topics')} />}
    </>
  );
};

export default SiteMeta;
