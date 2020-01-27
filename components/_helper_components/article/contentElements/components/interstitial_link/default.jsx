import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const InterstitialLink = ({ src }) => {
  const {
    content,
    url,
  } = src;

  if (!(src)) return null;
  return (
    <section className="borders b-margin-bottom-d60-m40">
      <span className="prefix">Explore</span>
      <a
        className="link"
        href={url}
        target="_self">
        {content}
      </a>
    </section>
  );
};

InterstitialLink.propTypes = {
  src: PropTypes.string,
};

export default InterstitialLink;
