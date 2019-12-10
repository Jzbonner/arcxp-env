import React from 'react';
import PropTypes from 'prop-types';

const List = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>List</strong>
      <p>{src.content}</p>
    </div>
);

List.propTypes = {
  src: PropTypes.any,
};

export default List;
