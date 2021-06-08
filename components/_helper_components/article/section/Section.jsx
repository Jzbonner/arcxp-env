import React from 'react';
import PropTypes from 'prop-types';
import ContentElements from '../contentElements/default.jsx';
import { isParagraph } from '../../../layouts/_helper_functions/Paragraph';
import './styles.scss';

const Section = ({
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

  elements.forEach((element) => {
    // filters the paragraphs to only show the ones inside the range specified by startIndex and stopIndex
    if (startIndex <= paragraphCounter && paragraphCounter < stopIndex) {
      if (stopIndex === elements.length) {
        newContentElements.push(element);
      }

      if (insertedAds) {
        let insertIndex;
        if (stopIndex === elements.length) {
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
      if (rightRail) {
        // we check to be sure the current element is a "paragraph"
        // and that it's the paragraph (index) that we want our right rail ad inserted before
        const rightRailInsertIndex = isParagraph(element.type) && paragraphCounter + 1 === rightRail.insertBeforeParagraph;
        if (rightRailInsertIndex && typeof rightRail.ad === 'function') {
          newContentElements.push(rightRail.ad());
        }
      }
      if (stopIndex !== elements.length) {
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

Section.propTypes = {
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

export default Section;
