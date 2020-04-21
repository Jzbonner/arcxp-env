import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { paragraphCounter } from '../../../layouts/_helper_functions/Paragraph';

const Nativo = ({
  elements = [], displayIfAtLeastXParagraphs, controllerClass, ampPage,
}) => {
  if (paragraphCounter(elements) >= displayIfAtLeastXParagraphs || controllerClass === 'story-nativo_placeholder--boap') {
    if (!ampPage) {
      return (
        <div className={`${controllerClass} ${controllerClass === 'story-nativo_placeholder--moap' ? 'b-clear-both' : ''}`}>Nativo</div>
      );
    }
    return (
      <amp-embed
        type="taboola"
        width="1000"
        height="300"
        layout="responsive"
        data-publisher={`"${controllerClass}"`}
        data-mode={`"${controllerClass}"`}
        data-placement="Taboola Content"
        data-article="auto"
      />
    );
  }
  return null;
};

Nativo.propTypes = {
  elements: PropTypes.array.isRequired,
  displayIfAtLeastXParagraphs: PropTypes.number,
  controllerClass: PropTypes.oneOf(['story-nativo_placeholder--moap', 'story-nativo_placeholder--boap']).isRequired,
  ampPage: PropTypes.bool.isRequired,
};

export default Nativo;
