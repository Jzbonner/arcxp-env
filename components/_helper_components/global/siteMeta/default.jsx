import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';
import { renderImage } from '../../article/stickyNav/default';

const SiteMeta = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  const {
    headlines, description, canonical_url: canonicalURL, type,
  } = globalContent || {};
  const { siteName, homeURL } = getProperties();
  const allTypes = Array.from(type);
  let metaDatafilter;
  const homeAndSection = metaDatafilter === `${'home' || 'section' || 'page'}`;

  const metaData = () => (
    <>
      <link rel="apple-touch-icon" href="resources/images/favicon-apple-touch-icon.png" />,
      <link rel="shortcut icon" href="resources/images/favicon.ico" />,
      <link rel="canonical" href={canonicalURL} />,
      <meta name="twitter:card" content="summary_large_image" />,
      <meta name="twitter:description" content={description.basic} />,
      <meta name="twitter:image" content={`${homeAndSection ? 'resources/images/logo-ogimage.png' : renderImage()}`} />
      <meta name="twitter:site" content={siteName} />
      <meta name="twitter:title" content={headlines.basic} />
      <meta name="twitter:url" content={`${metaDatafilter === 'home' ? homeURL : canonicalURL}`} />
      <meta property="og:image" content="resources/images/logo-ogimage.png" />
      <meta property="og:image:height" content="200" />
      <meta property="og:image:width" content={`${homeAndSection ? '200' : '800'}`} />
      <meta property="og:title" content={headlines.basic} />
      <meta property="og:type" content={`${homeAndSection ? 'website' : 'article'}`} />
      <meta property="og:url" content={canonicalURL} />
      <meta property="og:description" content={description.basic} />
      <meta property="og:site_name" content={siteName} />
      <title>{headlines.basic}</title>
    </>
  );

  allTypes.map((pageType) => {
    metaDatafilter = pageType;
    switch (pageType) {
      case `${'home' || 'section' || 'page'}`:
        return metaData();
      default:
        return metaData();
    }
  });
};

export default SiteMeta;

SiteMeta.propTypes = {
  canonical_url: PropTypes.object,
  headlines: PropTypes.object,
  description: PropTypes.object,
  siteName: PropTypes.object,
  metaValue: PropTypes.func,
};
