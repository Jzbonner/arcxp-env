import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ src }) => (
    <div className="b-margin-bottom-60">
      <p>Content Element Type: <strong>Table</strong> Not Worked. content: {src.content}</p>
    </div>
);

Table.propTypes = {
  src: PropTypes.object,
};

export default Table;
