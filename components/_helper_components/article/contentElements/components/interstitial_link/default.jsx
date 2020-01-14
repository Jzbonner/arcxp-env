import React from 'react';
import PropTypes from 'prop-types';

const InterstitialLink = ({ src }) => (
    <div className="b-margin-bottom-60">
      <p>Content Element Type: <strong>Interstitial Link</strong> Not Worked. Content: {src.content}</p>
    </div>
);

InterstitialLink.propTypes = {
  src: PropTypes.object,
};

export default InterstitialLink;
