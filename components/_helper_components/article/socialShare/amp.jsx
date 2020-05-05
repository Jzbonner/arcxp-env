import React from 'react';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';


const SocialShare = ({ headlines, basicItems }) => {
  const { basic: headline } = headlines || {};
  const { url: pinterestUrl } = basicItems || {};
  const { facebookAppID } = getProperties();
  return (
    <div className="social-share-buttons b-margin-bottom-d40-m20">
        { facebookAppID
          && <amp-social-share class="btn-facebook" type="facebook" width="35" height="35" data-param-app_id={facebookAppID}/>}
        <amp-social-share class="btn-twitter" type="twitter" width="35" height="35"/>
        <amp-social-share class="btn-pinterest" type="pinterest" width="35" height="35" data-param-media={pinterestUrl}/>
        <amp-social-share class="btn-mail" type="email" width="35" height="35" data-param-subject={headline}/>
    </div>
  );
};

SocialShare.propTypes = {
  headlines: PropTypes.object,
  basicItems: PropTypes.object,
};

export default SocialShare;
