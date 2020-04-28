import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { paragraphCounter } from '../../../layouts/_helper_functions/Paragraph';

const Nativo = ({
  elements = [], displayIfAtLeastXParagraphs, controllerClass, ampPage,
}) => {
  const { sites } = getProperties();

  if (paragraphCounter(elements) >= displayIfAtLeastXParagraphs || controllerClass === 'story-nativo_placeholder--boap') {
    if (ampPage) {
      return (
        <amp-ad
          type="nativo"
          width="400"
          height="350"
          layout="responsive"
          data-request-url={`https://amp.${sites[0]}.com/amp/ntv-${controllerClass === 'story-nativo_placeholder--moap' ? 'moap' : 'boap'}`}
        ></amp-ad>
      );
    }
    return <div className={`${controllerClass} ${controllerClass === 'story-nativo_placeholder--moap' ? 'b-clear-both' : ''}`}></div>;
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
