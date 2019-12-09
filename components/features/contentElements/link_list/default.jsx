import React from 'react';
import PropTypes from 'prop-types';

const LinkList = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Link List</strong>
      <p>{src.content}</p>
    </div>
);

LinkList.propTypes = {
  src: PropTypes.node,
};

export default LinkList;
