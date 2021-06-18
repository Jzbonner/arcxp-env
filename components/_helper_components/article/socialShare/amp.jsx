import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import PropTypes from 'prop-types';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';
import fetchEnv from '../../global/utils/environment';
import EmailIcon from '../stickyNav/_helper_functions/MailIcon.js';
import FbIcon from '../stickyNav/_helper_functions/FbIcon.js';
import TwitterIcon from '../stickyNav/_helper_functions/TwitterIcon.js';
import PinterestIcon from '../stickyNav/_helper_functions/PinterestIcon.js';

const SocialShare = ({ headlines, articleURL }) => {
  const { basic: headline } = headlines || {};

  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    facebookAppID, siteName, pinterestShareLogo,
  } = getProperties(arcSite);
  let sharedUrl = articleURL;
  const site = siteName.toLowerCase();
  if (sharedUrl.indexOf('.com') === -1) {
    const env = fetchEnv();
    // we must fully-qualify the url for sharing
    sharedUrl = `https://${env === 'prod' ? 'www' : 'sandbox'}.${site}.com${sharedUrl}`;
  }

  const pinterestUrl = renderImage().indexOf('/resources/logos/') > -1 ? pinterestShareLogo : renderImage();

  return (
    <div className="social-share-buttons b-margin-bottom-d40-m20">
      { facebookAppID
      && <amp-social-share
          class="icon-fb"
          type="facebook"
          width="11"
          height="19"
          data-param-app_id={facebookAppID}
          data-param-href={sharedUrl}><FbIcon /></amp-social-share>}

      <amp-social-share
        class="icon-twitter"
        type="twitter"
        width="23"
        height="19"
        data-param-text={headline}
        data-param-url={sharedUrl}><TwitterIcon /></amp-social-share>

      <amp-social-share
        class="icon-pinterest"
        type="pinterest"
        width="16"
        height="19"
        data-param-media={pinterestUrl}
        data-param-description={headline}
        data-param-url={sharedUrl}><PinterestIcon /></amp-social-share>

      <amp-social-share
        class="icon-email"
        type="email"
        width="27"
        height="19"
        data-param-body={sharedUrl}
        data-param-subject={headline}><EmailIcon /></amp-social-share>
    </div>
  );
};

SocialShare.propTypes = {
  headlines: PropTypes.object,
  articleURL: PropTypes.string,
};

export default SocialShare;
