import React from 'react';
import PropTypes from 'prop-types';
import ContentElements from '../contentElements/default.jsx';
import { isParagraph } from '../../../layouts/_helper_functions/Paragraph';
import './styles.scss';

const Section = ({
  elements, startIndex = 0, stopIndex = elements.length, rightRailAd, insertedAds,
}) => {
  let paragraphCounter = 0;
  const newContentElements = [];

  elements.forEach((element) => {
    // filters the paragraphs to only show the ones inside the range specified by startIndex and stopIndex
    if (startIndex <= paragraphCounter && paragraphCounter < stopIndex) {
      newContentElements.push(element);
    }

    // inserts Ads into the contentElements
    if (insertedAds) {
      const insertIndex = insertedAds.findIndex(el => paragraphCounter === el.insertAfterParagraph);
      if (insertIndex > -1) {
        newContentElements.push(insertedAds[insertIndex].ad());

        // removes the ad from the array to make sure we don't accidently display it again
        insertedAds.splice(insertIndex, 1);
      }
    }

    // keeps track of how many paragraphs have been mapped through
    if (isParagraph(element.type)) {
      paragraphCounter += 1;
    }

    return null;
  });

  return (
    <div className={`c-section ${rightRailAd ? 'with-rightRail' : ''}`}>
      <ContentElements contentElements={newContentElements} />
      {rightRailAd && <div className="c-rightRail">{rightRailAd()}</div>}
    </div>
  );
};

Section.propTypes = {
  elements: PropTypes.array,
  startIndex: PropTypes.number,
  stopIndex: PropTypes.number,
  rightRailAd: PropTypes.func,
  insertedAds: PropTypes.array,
};

export default Section;
