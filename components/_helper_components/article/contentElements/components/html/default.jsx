import React from 'react';
import PropTypes from 'prop-types';

const HTML = ({ src }) => (
  <div className="b-margin-bottom-d40-m20">
    Content Element Type: <strong>HTML</strong> Not Worked. Content:
      <div dangerouslySetInnerHTML={{ __html: src.content }}></div>
  </div>
);

HTML.propTypes = {
  src: PropTypes.object,
};

export default HTML;
