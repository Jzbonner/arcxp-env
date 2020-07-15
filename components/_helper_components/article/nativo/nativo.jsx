import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { paragraphCounter } from '../../../layouts/_helper_functions/Paragraph';

const Nativo = ({
  elements = [], displayIfAtLeastXParagraphs, controllerClass, ampPage,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { nativoMoapTag } = getProperties(arcSite);

  if (paragraphCounter(elements) >= displayIfAtLeastXParagraphs || controllerClass === 'story-nativo_placeholder--boap') {
    if (ampPage) {
      if (controllerClass === 'story-nativo_placeholder--moap') {
        return (
          <amp-ad
            type="nativo"
            width="400"
            height="350"
            layout="responsive"
            data-request-url={`${nativoMoapTag}-${
              controllerClass === 'story-nativo_placeholder--moap' ? 'moap' : 'boap'
            }`}
          ></amp-ad>
        );
      }
      return null;
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
