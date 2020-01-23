import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { paragraphCounter } from '../../../layouts/_helper_functions/Paragraph';

const Nativo = ({ elements = [], displayIfAtLeastXParagraphs, controllerClass }) => {
  if (paragraphCounter(elements) >= displayIfAtLeastXParagraphs || controllerClass === 'story-nativo_placeholder--boap') {
    return <div className={`c-nativo b-margin-bottom-d60-m40 ${controllerClass}`}></div>;
  }
  return null;
};

Nativo.propTypes = {
  elements: PropTypes.array.isRequired,
  displayIfAtLeastXParagraphs: PropTypes.number,
  controllerClass: PropTypes.oneOf(['story-nativo_placeholder--moap', 'story-nativo_placeholder--boap']).isRequired,
};

export default Nativo;
