import React from 'react';
import PropTypes from 'prop-types';
import { safeHtml } from '../../../../global/utils/stringUtils';

const Paragraph = ({ src, index }) => {
  const { content } = src;
  return <p className="story-text" data-index={index || null} dangerouslySetInnerHTML={{
    __html: safeHtml(content, {
      whiteList: {
        p: [],
        span: ['class', 'style'],
        a: ['href', 'data-*', 'target', 'class', 'on'],
        br: [],
        b: [],
        i: [],
        u: [],
        strong: [],
      },
    }),
  }} />;
};

Paragraph.propTypes = {
  src: PropTypes.object,
  index: PropTypes.number,
};
export default Paragraph;
