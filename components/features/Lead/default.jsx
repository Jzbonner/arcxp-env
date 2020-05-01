/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import ListItem from '../../_helper_components/home/ListItem/ListItem';
import Headline from '../../_helper_components/home/Headline/Headline';
import getColumnsMap from '../../layouts/_helper_functions/homepage/getColumnsMap';
import getFirstInlineImage from '../../layouts/_helper_functions/homepage/getFirstInlineImage';
import './default.scss';

const Lead = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      displayClass = '',
      startIndex = 1,
      itemLimit = 100,
      title = '',
      columns = 1,
    },
  } = customFields;

  const [filteredElements, setFilteredElements] = useState('');

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  function getDisplayClassMap(displayC) {
    switch (displayC) {
      case '5-Item Feature - Top Photo':
        return 'top-photo-display-class';
      case '5-Item Feature - Left Photo':
        return 'left-photo-display-class';
      case '5-Item Feature - No Photo':
        return 'no-photo-display-class';
      case '5-Item Feature - Center Lead Top Photo':
        return 'center-lead-display-class';
      case '1 or 2 Item Feature':
        return 'one-two-item-display-class';
      default:
        return 'top-photo-display-class';
    }
  }

  function getLists(apiData, start, limit) {
    return apiData.map((el, i) => {
      if (start <= i && i <= start + limit - 2) {
        return <ListItem key={`ListItem-${i}`} {...el} />;
      }
      return null;
    });
  }

  function renderColumn1(displayC, apiData) {
    switch (displayC) {
      case '5-Item Feature - Center Lead Top Photo':
        return getLists(apiData, startIndex, 3);
      case '1 or 2 Item Feature':
        return [...Array(columns).keys()].map(i => <Headline key={i} {...apiData[startIndex - 1 + i]} />);
      default:
        return null;
    }
  }

  function renderColumn2(displayC, apiData) {
    switch (displayC) {
      case '5-Item Feature - Top Photo':
      case '5-Item Feature - Left Photo':
      case '5-Item Feature - No Photo':
      case '5-Item Feature - Center Lead Top Photo':
        return <Headline {...apiData[startIndex - 1]} />;
      default:
        return null;
    }
  }

  function renderColumn3(displayC, apiData) {
    switch (displayC) {
      case '5-Item Feature - Top Photo':
      case '5-Item Feature - Left Photo':
        return getLists(apiData, startIndex, itemLimit);
      case '5-Item Feature - No Photo':
        return (
          <>
            {title && <div className="b-sectionTitle">{title}</div>}
            {getLists(apiData, startIndex, itemLimit)}
          </>
        );
      case '5-Item Feature - Center Lead Top Photo':
        return getLists(apiData, startIndex + 2, itemLimit - 2);
      default:
        return null;
    }
  }

  function addInlineImageToContentElements(elements) {
    // If no promo data, adds first inline image as new property to the content elements object
    const newElements = elements;
    const promiseArray = [];
    if (newElements) {
      newElements.forEach((el, i) => {
        if (el.type === 'story' && !el.promo_items) {
          getFirstInlineImage(el._id).then((firstInlineImage) => {
            if (firstInlineImage) {
              newElements[i].firstInlineImage = firstInlineImage;
            }
          });
          promiseArray.push(getFirstInlineImage);
        }
      });
    }
    return Promise.all(promiseArray).then(() => newElements);
  }

  function requireImages(elements, requiredClasses) {
    if (elements) {
      if (requiredClasses.some(requiredClass => requiredClass === displayClass)) {
        return elements.filter((el) => {
          if (el.type === 'story') {
            // if (el.promo_items && el.promo_items.basic && el.promo_items.basic.promo_image && el.promo_items.basic.promo_image.url) {
            //   return true;
            // }
            // if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
            //   return true;
            // }

            if (el.firstInlineImage) {
              console.log('has inline');
              return true;
            }
          }
          if (el.type === 'video' || el.type === 'gallery') {
            if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
              return true;
            }
          }
          return false;
        });
      }
    }
    return null;
  }

  function processContentElements() {
    const { content_elements: contentElements } = data || {};
    const displayClassesRequiringImg = ['5-Item Feature - Top Photo', '5-Item Feature - Left Photo'];

    return addInlineImageToContentElements(contentElements).then((el) => {
      //  console.log(el[0]);
      // console.log(Object.keys(el[0]));
      // if (!filteredElements) {
      //   setFilteredElements(requireImages(el, displayClassesRequiringImg));
      // }
    });
  }

  processContentElements();

  if (filteredElements && Array.isArray(filteredElements)) {
    return (
      <div className={`c-homeLeadContainer b-margin-bottom-d30-m20 ${getDisplayClassMap(displayClass)} ${getColumnsMap(columns)}`}>
        {renderColumn1(displayClass, filteredElements) && <div className="column-1">{renderColumn1(displayClass, filteredElements)}</div>}
        {renderColumn2(displayClass, filteredElements) && <div className="column-2">{renderColumn2(displayClass, filteredElements)}</div>}
        {renderColumn3(displayClass, filteredElements) && <div className="column-3">{renderColumn3(displayClass, filteredElements)}</div>}
      </div>
    );
  }
  return null;
};

Lead.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 1,
    }),
    itemLimit: PropTypes.number.tag({
      name: 'Item Limit',
      defaultValue: 5,
    }),
    displayClass: PropTypes.oneOf([
      '5-Item Feature - Top Photo',
      '5-Item Feature - Left Photo',
      '5-Item Feature - No Photo',
      '5-Item Feature - Center Lead Top Photo',
      '1 or 2 Item Feature',
    ]).tag({
      name: 'Display Class',
      defaultValue: '5-Item Feature - Top Photo',
    }),
    columns: PropTypes.oneOf([1, 2, 3, 4]).tag({
      name: 'Columns',
      defaultValue: 1,
    }),
    title: PropTypes.string.tag({
      name: 'Title - No Photo Display Class Only',
    }),
  }),
};

export default Lead;
