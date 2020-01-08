import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Divider = ({ src }) => (
    <>
      <p className="info-box">{src.content}</p>
      <hr className="divider"/>
    </>
);

Divider.propTypes = {
  src: PropTypes.any,
};

export default Divider;
