import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Table</strong>
      <p>{src.content}</p>
    </div>
);

Table.propTypes = {
  src: PropTypes.any,
};

export default Table;
