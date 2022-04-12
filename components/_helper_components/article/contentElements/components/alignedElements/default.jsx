import React, { createElement, Fragment } from 'react';
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

  const getComponent = (element, i) => {
    switch (element.type) {
      case 'text':
        return (
          <Paragraph
            src={element}
            key={`Paragraph-${i}`}
            alignment={element.alignment}
          />
        );
      case 'image':
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
      default:
        if (element?.props?.componentName === 'ArcAd') {
          return <Fragment key={`test-${i}`}>{element}</Fragment>;
        }
        return null;
    }
  };

  elements.forEach((element, i) => {
    // If align value is same as align value of previous or next element,
    // it gets added to an array of those elements so they later can be inserted inside a column div inside the aligned elements block
    if (
      element.alignment === elements?.[i + 1]?.alignment
      || element.alignment === elements?.[i - 1]?.alignment
    ) {
      alignDirection = element.alignment;
      columnArray.push(getComponent(element, i));
    } else if (
      // If element is next to an ad and matches certain other conditions, then it belongs in a column div inside the aligned elements block
      (!alignDirection && element.alignment && elements?.[i + 1]?.props?.componentName === 'ArcAd')
      || (alignDirection && element.alignment === alignDirection && elements?.[i - 1]?.props?.componentName === 'ArcAd')) {
      alignDirection = element.alignment;
      columnArray.push(getComponent(element, i));
    } else if (element?.props?.componentName === 'ArcAd') {
      if (elements?.[i - 1]?.alignment && elements?.[i + 1]?.alignment) {
        columnArray.push(getComponent(element, i));
      }
    } else {
      // We've reached the end of the consecutively aligned elements,
      // if there have been consecutively left or right aligned elements and ads that we've added to the columnArray,
      // then put these inside a div inside the new aligned elements block
      if (columnArray.length > 0) {
        newAlignedElements.push(
          createElement('div', { key: `column-${i}`, className: `column align-${alignDirection}` }, columnArray),
        );
        columnArray = [];
        alignDirection = '';
      }
      newAlignedElements.push(getComponent(element, i));
    }
  });

  // We've reached the end of the block of aligned elements, add the columnArray to the new Aligned Elements if it is not empty
  // This happens if the last element in this group of aligned elements is aligned the same way as the previous element.
  if (columnArray.length > 0) {
    newAlignedElements.push(
      createElement('div', { key: `column-${columnArray.length}`, className: `column align-${alignDirection}` }, columnArray),
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
