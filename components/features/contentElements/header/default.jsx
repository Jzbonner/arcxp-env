import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Header</strong>
      <p>{src.content}</p>
    </div>
);

Header.propTypes = {
  src: PropTypes.any,
};

export default Header;
