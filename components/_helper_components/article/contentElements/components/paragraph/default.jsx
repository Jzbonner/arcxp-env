import React from 'react';
import PropTypes from 'prop-types';
import { safeHtml } from '../../../../global/utils/stringUtils';

const Paragraph = ({ src, index, alignment }) => {
  const { content } = src;
  return <p className={`story-text ${alignment ? `align-${alignment}` : ''}`} data-index={index || null} dangerouslySetInnerHTML={{
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
  alignment: PropTypes.string,
};
export default Paragraph;
