import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Divider = ({ src }) => (
    <>
      {/* <p>Content Element Type: <strong>Info Box Divider</strong> {src.content}</p> */}
      <p className="info-box">{src.content}</p>
      <hr className="divider"/>
      {/* <p className="info-box">hello info box</p>
      <p className="info-box">hello story text box</p> */}
    </>
);

Divider.propTypes = {
  src: PropTypes.any,
};

export default Divider;
