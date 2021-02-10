import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { paragraphCounter } from '../../../layouts/_helper_functions/Paragraph';

const Nativo = ({
  elements = [], displayIfAtLeastXParagraphs, controllerClass, ampPage, isMeteredStory = false,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  if (paragraphCounter(elements) >= displayIfAtLeastXParagraphs || controllerClass === 'story-nativo_placeholder--boap') {
    if (ampPage) {
      if (controllerClass === 'story-nativo_placeholder--moap') {
        return (
          <amp-ad
            type="nativo"
            width="400"
            height="400"
            layout="responsive"
            data-request-url={`https://amp.${arcSite}.com/amp/nativo`}
            amp-access={isMeteredStory ? 'Error=true OR AccessLevel="Full Content Access"' : null}
            amp-access-hide={isMeteredStory ? '' : null}
          ></amp-ad>
        );
      }
      return null;
    }
    const isBoap = controllerClass === 'story-nativo_placeholder--boap';
    if (isBoap) {
      return (
        <div className='taboola-split'>
          <div className={controllerClass}></div>
        </div>
      );
    }
    return <div className={`${controllerClass} b-clear-both`}></div>;
  }
  return null;
};

Nativo.propTypes = {
  elements: PropTypes.array.isRequired,
  displayIfAtLeastXParagraphs: PropTypes.number,
  controllerClass: PropTypes.oneOf(['story-nativo_placeholder--moap', 'story-nativo_placeholder--boap']).isRequired,
  ampPage: PropTypes.bool.isRequired,
  isMeteredStory: PropTypes.bool,
};

export default Nativo;
