import React from 'react';
import PropTypes from 'prop-types';
import List from '../list/default';
import Paragraph from '../paragraph/default';
import './styles.scss';

const Blockquote = ({ src }) => {
  const { content_elements: contentElements, citation } = src;

  return (
    <div className="blockquote">
      {contentElements.map((el) => {
        switch (el.type) {
          case 'list':
            return <List src={el} />;
          case 'text':
            return <Paragraph src={el} />;
          default:
            return null;
        }
      })}
      {citation && <div className="citation">- {citation.content}</div>}
    </div>
  );
};

Blockquote.propTypes = {
  src: PropTypes.any,
};

export default Blockquote;
