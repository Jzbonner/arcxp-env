import React from 'react';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';
import fetchEnv from '../../global/utils/environment';
import getItemThumbNail from '../../../features/Slider/_helper_functions/getItemThumbnail';


const SocialShare = ({ headlines, promoItems, articleURL }) => {
  const { basic: headline } = headlines || {};
  const { basic: basicItems } = promoItems || {};
  const { url: headlineImage } = basicItems || {};
  const { facebookAppID, siteName, logoShort } = getProperties();
  let sharedUrl = articleURL;
  let site = siteName.toLowerCase();
  site = site ? site.replace(/w/gi, '') : '';
  if (sharedUrl.indexOf('.com') === -1) {
    const env = fetchEnv();
    // we must fully-qualify the url for sharing
    sharedUrl = `https://${env === 'prod' ? site : `${site}-${site}-${env}.cdn.arcpublishing`}.com${sharedUrl}`;
  }


  let pinterestUrl = headlineImage;

  if (!headlineImage) {
    pinterestUrl = getItemThumbNail(promoItems);
  }
  if (!pinterestUrl) {
    pinterestUrl = logoShort;
  }

  return (
    <div className="social-share-buttons b-margin-bottom-d40-m20">
        { facebookAppID
        && <amp-social-share
            class="btn-facebook"
            type="facebook"
            width="35" height="35"
            data-param-app_id={facebookAppID}/>}

        <amp-social-share
          class="btn-twitter"
          type="twitter"
          width="35"
          height="35"
          data-param-text={headline}
          data-param-url={sharedUrl}/>

        <amp-social-share
          class="btn-pinterest"
          type="pinterest"
          width="35"
          height="35"
          data-param-media={pinterestUrl}
          data-param-description={headline}/>

        <amp-social-share
          class="btn-mail"
          type="email"
          width="35"
          height="35"
          data-param-body={sharedUrl}
          data-param-subject={headline}/>
    </div>
  );
};

SocialShare.propTypes = {
  headlines: PropTypes.object,
  promoItems: PropTypes.object,
  articleURL: PropTypes.string,
};

export default SocialShare;
