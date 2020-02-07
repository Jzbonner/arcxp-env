import React from 'react';
import PropTypes from 'prop-types';
import List from '../list/default.jsx';
import Paragraph from '../paragraph/default.jsx';
import './styles.scss';

const Blockquote = ({ contentElements, citation }) => (
  <div className="blockquote b-margin-bottom-d40-m20">
    {contentElements.map((el, index) => {
      switch (el.type) {
        case 'list':
          return <List key={`blockquote-${index}`} src={el} />;
        case 'text':
          return <Paragraph key={`blockquote-${index}`} src={el} />;
        default:
          return null;
      }
    })}
    {citation && <div className="blockquote-citation">- {citation.content}</div>}
  </div>
);

Blockquote.propTypes = {
  contentElements: PropTypes.array,
  citation: PropTypes.obj,
};

export default Blockquote;
