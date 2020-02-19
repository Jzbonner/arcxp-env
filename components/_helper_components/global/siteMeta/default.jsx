import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const SiteMeta = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

  // const siteNavigation = useContent({
  //   source: 'site-api',
  //   query: {
  //     hierarchy: 'website',
  //   },
  // });

  const {
    headlines,
    description,
    subtype,
    canonical_url: canonicalURL,
  } = globalContent || {};

  const {
    siteName, homeURL,
  } = getProperties();

  return (
    <>
      {/* ##ALL PAGES */}
      <link rel='apple-touch-icon' href='resources/images/favicon-apple-touch-icon.png' />
      <link rel='shortcut icon' href='resources/images/favicon.ico' />
      <link rel='canonical' href={canonicalURL} />

      {/* ##Homepage and Section Pages */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:description' content={description.basic} />
      <meta name='twitter:image' content='resources/images/logo-ogimage.png' />
      <meta name='twitter:site' content={siteName} />
      <meta name='twitter:title' content={headlines.basic} />
      <meta name='twitter:url' content={homeURL} />
      <meta property='og:image' content='resources/images/logo-ogimage.png' />
      <meta property='og:image:height' content='200' />
      <meta property='og:image:width' content='200' />
      <meta property='og:title' content='{headlines.basic}' />
      {/* content should be website for article */}
      <meta property='og:type' content={subtype} />
      <meta property='og:url' content={canonicalURL} />
      <meta property='og:description' content={description.basic} />
      <meta property='og:site_name' content={siteName} />
      <meta name='description' content={description.basic} />
      <title>{headlines.basic}</title>
      <meta name='language' content='English' />

      {/* ##Article page, Video page, Gallery page Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      {/* content should the article Description (if an article page),
      video Caption (if a video page), OR gallery Description (if a gallery page);
      if no value exists in the article Description field, then use the first one or two sentences
      of article body text, up to 100 characters followed by … if break is mid sentence */}
      <meta name='twitter:description' content={description.basic} />
      {/* content should be featured image OR featured video thumbnail
      OR first in featured gallery OR first inline image OR first video thumbnail */}
      <meta name='twitter:image' content='resources/images/logo-ogimage.png' />
      <meta name='twitter:site' content={siteName} />
      <meta name='twitter:title' content={headlines.basic} />
      {/* content should be undecorated URL, without session variables, user identifying parameters, or counters */}
      <meta name='twitter:url' content={canonicalURL} />

      {/* content is featured image OR featured video thumbnail
      OR first image in a featured gallery; OR, if no featured object exists on an article page,
      use the first inline image OR first inline video thumbnail */}
      <meta property='og:image' content='resources/images/logo-ogimage.png' />
      <meta property='og:image:height' content='200' />
      <meta property='og:image:width' content='800' />
      {/* content should headline, video title, or gallery title */}
      <meta property='og:title' content={headlines.basic} />
      <meta property='og:type' content={subtype} />
      <meta property='og:url' content={canonicalURL} />
      {/* the article Description (if an article page), video Caption (if a video page),
      OR gallery Description (if a gallery page); if no value exists in the article Description field,
      then use the first one or two sentences of article body text,
      up to 100 characters followed by … if break is mid sentence */}
      <meta property='og:description' content={description.basic} />
      <meta property='og:site_name' content={siteName} />
      {/* title should be article headline, video title, or gallery title */}
      <title>{headlines.basic}</title>
      {/* a URL for the main image associated with the content, which is the featured image
      OR featured video thumbnail OR first image in a featured gallery;
      OR, if no featured object exists on an article page, use the first inline image
      OR first inline video thumbnail (whichever appears first) */}
      <meta name='thumbnail' content='' />
      <meta name='language' content='English' />
    </>
  );
};

export default SiteMeta;

SiteMeta.propTypes = {
  canonical_url: PropTypes.object,
  headlines: PropTypes.object,
  description: PropTypes.object,
  subtype: PropTypes.object,
  siteName: PropTypes.object,
  metaValue: PropTypes.func,
};
