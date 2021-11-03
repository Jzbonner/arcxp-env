import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const UBBNChain = ({ children, customFields }) => {
  const { textAlignment = 'right' } = customFields || {};
  return <div className={`c-ubbnChain aligned-${textAlignment}`}>
    <div className='chain-content'>
      <div className='row'>{children}</div>
    </div>
  </div>;
};

UBBNChain.propTypes = {
  children: PropTypes.array,
  customFields: PropTypes.shape({
    textAlignment: PropTypes.oneOf([
      'left',
      'right',
    ]).tag({
      name: 'Text Alignment',
      defaultValue: 'right',
      description:
        'Determines the text alignment in relation to the image (and also the gradient focus).',
    }),
  }),
};

export default UBBNChain;
