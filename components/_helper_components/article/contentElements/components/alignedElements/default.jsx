import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import Image from '../../../../global/image/default.jsx';
import Paragraph from '../paragraph/default.jsx';
import './style.scss';

const AlignedElements = ({ src, ampPage, index }) => {
  const { maxTabletViewWidth } = getProperties();
  const { items: elements } = src;
  const newAlignedElements = [];
  let columnArray = [];
  let alignDirection = '';

  const component = (element, i) => {
    if (element.type === 'text') {
      return (
        <Paragraph
          src={element}
          key={`Paragraph-${i}`}
          alignment={element.alignment}
        />
      );
    }
    if (element.type === 'image') {
      return (
        <Image
          width={800}
          height={0}
          src={element}
          imageType="isInlineImage"
          ampPage={ampPage}
          imageMarginBottom="b-margin-bottom-d40-m20"
          maxTabletViewWidth={maxTabletViewWidth}
          key={`Image-${i}`}
        />
      );
    }
    return null;
  };

  elements.forEach((element, i) => {
    // If align value is same as align value of previous or next element,
    // it gets added to an array of those elements so they later can be inserted inside a div(on line 53 or 63)
    if (
      element.alignment === elements?.[i + 1]?.alignment
      || (element.alignment === elements?.[i - 1]?.alignment)
    ) {
      alignDirection = element.alignment;
      columnArray.push(component(element, i));
    } else {
      // We've reached the end of the consecutively aligned elements,
      // time to insert them inside a div and add that to the main array
      if (columnArray.length > 0) {
        newAlignedElements.push(
          createElement('div', { className: `column align-${alignDirection}` }, columnArray),
        );
        columnArray = [];
      }
      newAlignedElements.push(component(element, i));
    }
  });

  // We've reached the end of the block of aligned elements, add the columnArray to the new Aligned Elements if it is not empty
  // This happens if the last element in this group of aligned elements is aligned the same way as the previous element.
  if (columnArray.length > 0) {
    newAlignedElements.push(
      createElement('div', { className: `column align-${alignDirection}` }, columnArray),
    );
  }

  return <div className="c-aligned-elements" data-index={index || null}>{newAlignedElements}</div>;
};

AlignedElements.propTypes = {
  src: PropTypes.object,
  ampPage: PropTypes.boolean,
  index: PropTypes.number,
};


export default AlignedElements;
