import React from 'react';
import PropTypes from 'prop-types';
import ContentElements from '../contentElements/default.jsx';
import { isParagraph } from '../../../layouts/_helper_functions/Paragraph';
import isNotBR from '../../../layouts/_helper_functions/BR';
import './styles.scss';

const Section = ({
  /* insertedAds, */
  elements,
  startIndex = 0,
  stopIndex = elements.length,
  rightRailAd,
}) => {
  let paragraphCounter = 0;
  const newContentElements = [];

  elements.forEach((element) => {
    // filters the paragraphs to only show the ones inside the range specified by startIndex and stopIndex
    if (startIndex <= paragraphCounter && paragraphCounter < stopIndex) {
      // ////////
      // Inserts Ads into the contentElements. Commented out for now so QA is not confused.
      // ///////

      // if (insertedAds) {
      //   const insertIndex = insertedAds.findIndex(el => paragraphCounter === el.insertAfterParagraph);
      //   if (insertIndex > -1) {
      //     newContentElements.push(insertedAds[insertIndex].ad());

      //     // removes the ad from the array to make sure we don't accidentally display it again
      //     insertedAds.splice(insertIndex, 1);
      //   }
      // }

      if (isNotBR(element)) {
        newContentElements.push(element);
      }
    }

    // keeps track of how many paragraphs have been mapped through
    if (isParagraph(element.type) && isNotBR(element)) {
      paragraphCounter += 1;
    }

    return null;
  });

  if (newContentElements.length > 0) {
    return (
      <div className={`c-section ${rightRailAd ? 'with-rightRail' : ''} b-margin-bottom-d40-m20`}>
        <ContentElements contentElements={newContentElements} />
        {rightRailAd && <div className="c-rightRail">{rightRailAd()}</div>}
      </div>
    );
  }
  return null;
};

Section.propTypes = {
  elements: PropTypes.array,
  startIndex: PropTypes.number,
  stopIndex: PropTypes.number,
  rightRailAd: PropTypes.func,
  insertedAds: PropTypes.array,
};

export default Section;
