import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../../src/styles/base/_utility.scss';

const Oembed = ({ src }) => {
  const {
    raw_oembed: rawOembed,
  } = src;
  const {
    type,
    html,
  } = rawOembed;
  let filteredHtml = html;
  let SCRIPT_URL;
  const scriptFilter = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;

  if (type === 'reddit' || type === 'facebook-post' || type === 'facebook-video' || type === 'twitter' || type === 'instagram') {
    filteredHtml = html.replace(scriptFilter, '');
    if (type === 'reddit') {
      SCRIPT_URL = 'https://embed.redditmedia.com/widgets/platform.js';
      /* eslint-disable-next-line global-require */
      require('scriptjs')(SCRIPT_URL);
    } else if (type === 'facebook-post' || type === 'facebook-video') {
      SCRIPT_URL = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0';
      /* eslint-disable-next-line global-require */
      require('scriptjs')(SCRIPT_URL);
    } else if (type === 'twitter') {
      SCRIPT_URL = 'https://platform.twitter.com/widgets.js';
      /* eslint-disable-next-line global-require */
      require('scriptjs')(SCRIPT_URL);
    } else if (type === 'instagram') {
      SCRIPT_URL = '//www.instagram.com/embed.js';
      /* eslint-disable-next-line global-require */
      require('scriptjs')(SCRIPT_URL);
    }
  }

  return (
    <div
    data-oembed-type={type}
    className='b-flexRow b-flexCenter'
    dangerouslySetInnerHTML={{ __html: filteredHtml }}/>
  );
};

Oembed.propTypes = {
  src: PropTypes.object,
  rawOembed: PropTypes.object,
  type: PropTypes.string,
  html: PropTypes.string,
};

export default Oembed;
