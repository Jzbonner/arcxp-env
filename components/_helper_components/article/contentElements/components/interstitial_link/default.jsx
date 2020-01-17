import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const InterstitialLink = ({ src }) => {
  if (!(src)) return null;

  return (
    <div className="borders b-margin-bottom-d60-m40">
      <div className="prefix-box">
        <span className="prefix">Explore</span>
      </div>
      <div className="interstitial">
        <a
          className="link"
          href={'https://www.google.com/'}
          rel="noopener noreferrer"
          target="_blank"
          dangerouslySetInnerHTML={{ __html: src.content }}
        />
      </div>
    </div>
  );
};

InterstitialLink.propTypes = {
  src: PropTypes.string,
};

export default InterstitialLink;
