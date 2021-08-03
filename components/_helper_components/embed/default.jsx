import React from 'react';
import PropTypes from 'prop-types';

const Embed = ({ zones }) => zones && zones.map((zone) => {
  const {
    content,
  } = zone;
  return <>
    {!Array.isArray(content) && content}
    {Array.isArray(content) && content.map(feature => feature)};
  </>;
});

Embed.propTypes = {
  zones: PropTypes.array,
  layout: PropTypes.string,
};

export default Embed;
