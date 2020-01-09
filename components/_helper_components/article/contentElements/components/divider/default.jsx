import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Divider = ({ src }) => (
    <>
      <hr className="divider"/>
      <p className="info-box">{src.content}</p>
    </>
);

Divider.propTypes = {
  src: PropTypes.object,
};

export default Divider;
