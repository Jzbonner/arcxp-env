import React from 'react';
import PropTypes from 'prop-types';
import ContentElements from '../contentElements/default.jsx';
import { isParagraph } from '../../../layouts/_helper_functions/Paragraph';

const Section = ({
  insertedMobileAds,
  insertedDesktopAds,
  elements,
  insertAtSectionEnd,
  startIndex = 0,
  stopIndex = elements.length,
  comesAfterDivider = false,
  ampPage = false,
  noAds,
}) => {
  let paragraphCounter = 0;
  const contentElementsWithMobileAds = [];
  const contentElementsWithAlignedBlock = [];
  const contentElementsWithDesktopAds = [];

  const incompleteSectionSegment = stopIndex > elements.length;
  let rowOfAlignedElements = [];

  const pushRowOfAlignedElements = () => {
    if (rowOfAlignedElements.length) {
      contentElementsWithAlignedBlock.push({
        type: 'aligned_elements',
        items: rowOfAlignedElements,
      });
      rowOfAlignedElements = [];
    }
  };

  // Inserts mobile ads
  elements.forEach((element, i) => {
    const isLastItemInSection = incompleteSectionSegment && i === elements.length - 1;
    // filters the paragraphs to only show the ones inside the range specified by startIndex and stopIndex

    // it's the `stop index` or the last item in a list that doesn't have enough items to reach the stop index
    if (stopIndex === elements.length || isLastItemInSection) {
      contentElementsWithMobileAds.push(element);
    }
    // handle ads, if there are any
    if (insertedMobileAds) {
      let insertIndex;
      if (stopIndex === elements.length || isLastItemInSection) {
        insertIndex = insertedMobileAds.findIndex(el => paragraphCounter + 1 === el.insertAfterMobileParagraph);
      } else {
        insertIndex = insertedMobileAds.findIndex(el => paragraphCounter === el.insertAfterMobileParagraph);
      }
      if (insertIndex > -1) {
        insertedMobileAds[insertIndex].adArray.forEach((el) => {
          if (!noAds || el()?.props?.componentName !== 'ArcAd') {
            contentElementsWithMobileAds.push(el());
          }
        });
      }
    }
    // it's not last (and thus hasn't already been added) so add it to the array
    if (stopIndex !== elements.length && !isLastItemInSection) {
      contentElementsWithMobileAds.push(element);
    }

    // keeps track of how many paragraphs have been mapped through
    if (isParagraph(element.type)) {
      paragraphCounter += 1;
    }

    return null;
  });

  // Transform consecutive aligned elements into an aligned block
  contentElementsWithMobileAds.forEach((element, i) => {
    if (
      (!element.alignment && element?.props?.componentName !== 'ArcAd')
      || (element.alignment
        && !element.type === 'text'
        && !element.type === 'image')
    ) {
      // The current element is not aligned and not an ad, indicating the preceding group of aligned elements has ended.
      pushRowOfAlignedElements();
      contentElementsWithAlignedBlock.push(element);
    } else if (element.alignment) {
      if ((contentElementsWithMobileAds?.[i - 1]?.alignment === 'center' || element.alignment === 'center')
         || (contentElementsWithMobileAds?.[i - 1]?.alignment === 'right' && element.alignment === 'left')
      ) {
        // The current element is aligned but
        //   1. it or the previous element is aligned center or
        //   2. it is aligned left while the previous one is aligned right
        // indicating it belongs in a new block of aligned elements.
        //
        // So first reset the current block of aligned elements.
        pushRowOfAlignedElements();
      }
      rowOfAlignedElements.push(element);
    } else if (element?.props?.componentName === 'ArcAd') {
      if (contentElementsWithMobileAds?.[i - 1]?.alignment === 'left' && contentElementsWithMobileAds?.[i + 1]?.alignment) {
        // The current item is an ad between two aligned elements and they belong together in the same block
        // Moving it out of this block will break calculations in the alignedElements.jsx file
        rowOfAlignedElements.push(element);
      } else {
        pushRowOfAlignedElements();
        contentElementsWithAlignedBlock.push(element);
      }
    }
  });

  // Inserts desktop ads
  paragraphCounter = 0;
  contentElementsWithAlignedBlock.forEach((element, i) => {
    const isLastItemInSection = incompleteSectionSegment && i === contentElementsWithAlignedBlock.length - 1;
    // filters the paragraphs to only show the ones inside the range specified by startIndex and stopIndex

    if (startIndex <= paragraphCounter && paragraphCounter < stopIndex) {
      if (stopIndex === contentElementsWithAlignedBlock.length || isLastItemInSection) {
        contentElementsWithDesktopAds.push(element);
      }
      // handle ads, if there are any
      if (insertedDesktopAds) {
        let insertIndex;
        if (stopIndex === contentElementsWithAlignedBlock.length || isLastItemInSection) {
          insertIndex = insertedDesktopAds.findIndex(el => paragraphCounter + 1 === el.insertAfterDesktopParagraph);
        } else {
          insertIndex = insertedDesktopAds.findIndex(el => paragraphCounter === el.insertAfterDesktopParagraph);
        }
        if (insertIndex > -1) {
          insertedDesktopAds[insertIndex].adArray.forEach((el) => {
            if (!noAds || el()?.props?.componentName !== 'ArcAd') {
              contentElementsWithDesktopAds.push(el());
            }
          });

          // removes the ad from the array to make sure we don't accidentally display it again
          insertedDesktopAds.splice(insertIndex, 1);
        }
      }
      // it's not last (and thus hasn't already been added) so add it to the array
      if (stopIndex !== contentElementsWithAlignedBlock.length && !isLastItemInSection) {
        contentElementsWithDesktopAds.push(element);
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
        contentElementsWithDesktopAds.push(component);
      } else if (typeof component === 'function' && React.isValidElement(component())) {
        contentElementsWithDesktopAds.push(component());
      }
    });
  }

  if (contentElementsWithDesktopAds.length > 0) {
    return (
      <div className={
          `c-section b-sectionHome-padding
          full-width b-clear-both
          b-margin-bottom-d40-m20
          ${comesAfterDivider ? 'after-divider' : ''}`
        }>
        <ContentElements contentElements={contentElementsWithDesktopAds} ampPage={ampPage} />
      </div>
    );
  }

  return null;
};

Section.propTypes = {
  elements: PropTypes.array,
  startIndex: PropTypes.number,
  stopIndex: PropTypes.number,
  insertedMobileAds: PropTypes.array,
  insertedDesktopAds: PropTypes.array,
  insertAtSectionEnd: PropTypes.array,
  comesAfterDivider: PropTypes.boolean,
  ampPage: PropTypes.boolean,
  noAds: PropTypes.boolean,
};

export default Section;
