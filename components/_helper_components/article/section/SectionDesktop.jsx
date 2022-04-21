import React from 'react';
import PropTypes from 'prop-types';
import ContentElements from '../contentElements/default.jsx';
import { isParagraph } from '../../../layouts/_helper_functions/Paragraph';

const SectionDesktop = ({
  insertedAds,
  elements,
  insertAtSectionEnd,
  startIndex = 0,
  stopIndex = elements.length,
  fullWidth = false,
  rightRail,
  comesAfterDivider = false,
  ampPage = false,
}) => {
  let paragraphCounter = 0;
  const newContentElements = [];
  const incompleteSectionSegment = stopIndex > elements.length;
  elements.forEach((element, i) => {
    const isLastItemInSection = incompleteSectionSegment && i === elements.length - 1;
    // filters the paragraphs to only show the ones inside the range specified by startIndex and stopIndex
    if (startIndex <= paragraphCounter && paragraphCounter < stopIndex) {
      // right rail comes first to properly handle the two paragraph scenario (see APD-1478 for more details)
      if (rightRail) {
        // we check to be sure the current element is a "paragraph"
        // and that it's the paragraph (index) that we want our right rail ad inserted before
        const rightRailInsertIndex = isParagraph(element.type) && paragraphCounter + 1 === rightRail.insertBeforeParagraph;
        if (rightRailInsertIndex && typeof rightRail.ad === 'function') {
          newContentElements.push(rightRail.ad());
        }
      }
      // it's the `stop index` or the last item in a list that doesn't have enough items to reach the stop index
      if (stopIndex === elements.length || isLastItemInSection) {
        newContentElements.push(element);
      }
      // handle ads, if there are any
      if (insertedAds) {
        let insertIndex;
        if (stopIndex === elements.length || isLastItemInSection) {
          insertIndex = insertedAds.findIndex(el => paragraphCounter + 1 === el.insertAfterParagraph);
        } else {
          insertIndex = insertedAds.findIndex(el => paragraphCounter === el.insertAfterParagraph);
        }
        if (insertIndex > -1) {
          insertedAds[insertIndex].adArray.forEach((el) => {
            newContentElements.push(el());
          });

          // removes the ad from the array to make sure we don't accidentally display it again
          insertedAds.splice(insertIndex, 1);
        }
      }
      // it's not last (and thus hasn't already been added) so add it to the array
      if (stopIndex !== elements.length && !isLastItemInSection) {
        newContentElements.push(element);
      }
    }

    // keeps track of how many paragraphs have been mapped through
    if (isParagraph(element.type)) {
      paragraphCounter += 1;
    }

    return null;
  });

  // Inserts components at end of section.
  // Most useful for inserting components like connext end-of-story and blog author info at the end of the last section
  // The two conditionals here allow components to be inserted directly or to be returned from functions
  if (insertAtSectionEnd) {
    insertAtSectionEnd.forEach((component) => {
      if (React.isValidElement(component)) {
        newContentElements.push(component);
      } else if (typeof component === 'function' && React.isValidElement(component())) {
        newContentElements.push(component());
      }
    });
  }

  if (newContentElements.length > 0) {
    return (
      <div className={
          `c-section b-sectionHome-padding
          ${fullWidth ? 'full-width b-clear-both' : ''}
          b-margin-bottom-d40-m20
          ${comesAfterDivider ? 'after-divider' : ''}`
        }>
        <ContentElements contentElements={newContentElements} ampPage={ampPage} />
      </div>
    );
  }

  return null;
};

SectionDesktop.propTypes = {
  elements: PropTypes.array,
  startIndex: PropTypes.number,
  stopIndex: PropTypes.number,
  fullWidth: PropTypes.boolean,
  rightRail: PropTypes.object,
  insertedAds: PropTypes.array,
  insertAtSectionEnd: PropTypes.array,
  comesAfterDivider: PropTypes.boolean,
  ampPage: PropTypes.boolean,
};

export default SectionDesktop;
