import React from 'react';
import PropTypes from 'prop-types';
import List from '../list/default';
import Paragraph from '../paragraph/default';
import './styles.scss';

const Blockquote = ({ contentElements, citation }) => (
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
    {citation && <div className="blockquote-citation">- {citation.content}</div>}
  </div>
);

Blockquote.propTypes = {
  contentElements: PropTypes.array,
  citation: PropTypes.string,
};

export default Blockquote;
