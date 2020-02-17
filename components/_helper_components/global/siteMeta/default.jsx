import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const SiteMeta = () => {
  return (
    <>
      <link rel='apple-touch-icon' href='https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/myajc/images/favicon-apple-touch-icon.png' />
      <link rel='shortcut icon' href='https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/myajc/images/favicon.ico' />
      <link rel='canonical' href='' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:description' content='' />
      <meta name='twitter:image' content='https://www.ajc.com/rw/PortalConfig/np-ajc/assets-one/ajc/images/logo-ogimage.png' />
      <meta name='twitter:site' content='@ajc' />
      <meta name='twitter:title' content='' />
      <meta name='twitter:url' content='' />
      <meta property='og:image' content='https://www.ajc.com/rw/PortalConfig/np-ajc/assets-one/ajc/images/logo-ogimage.png' />
      <meta property='og:image:height' content='200' />
      <meta property='og:image:width' content='200' />
      <meta property='og:title' content='' />
      <meta property='og:type' content='' />
      <meta property='og:url' content='' />
      <meta property='og:description' content='' />
      <meta property='og:site_name' content='' />
      <meta name='description' content='' />
      <meta name='language' content='English' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:description' content='' />
      <meta name='twitter:image' content='' />
      <meta name='twitter:site' content='@ajc' />
      <meta name='twitter:title' content='' />
      <meta name='twitter:url' content='' />

      <meta property='og:image' content='' />
      <meta property='og:image:height' content='' />
      <meta property='og:image:width' content='' />
      <meta property='og:title' content='' />
      <meta property='og:type' content='article' />
      <meta property='og:url' content='' />
      <meta property='og:description' content='' />
      <meta property='og:site_name' content='' />

      <meta name='thumbnail' content='' />
      <meta name='language' content='English' />
    </>
  );
};

export default SiteMeta;

SiteMeta.propTypes = {
  metaValue: PropTypes.func,
};
