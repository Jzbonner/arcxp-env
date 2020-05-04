import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import truncateHeadline from '../../layouts/_helper_functions/homepage/truncateHeadline';
import './default.scss';

const ListOrderedUnordered = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      displayClass = '',
      startIndex = 1,
      itemLimit = 1,
      title = '',
    },
  } = customFields;

  const data = useContent({
    source: contentService,
    query: { ...contentConfigValues, arcSite },
  });

  if (data) {
    const { content_elements: innerData } = data || {};
    const index = startIndex - 1; // starting the array from 1st child
    const limitResult = index + itemLimit; // making sure the limit adds the index, so it doesn't reduce number of results
    const filteredData = innerData.slice(index, limitResult); // filtering data based on startIndex & itemLimit (user input)

    if (innerData) {
      return (
        <div className={`c-${displayClass} b-margin-bottom-d30-m20`}>
          {title && <div className="b-sectionTitle">{title}</div>}
          <ul className="c-list-box">
            {filteredData.map((el, i) => {
              const { basic: headline } = el.headlines ? el.headlines : '';
              const { canonical_url: itemURL } = el || '';
              const countOrdered = i + 1 > 9 ? i + 1 : `0${i + 1}`;
              return (
                <li className="list-item" key={i}>
                  <span className={`item-index-${displayClass}`}>{displayClass === 'Ordered List' ? countOrdered : ''}</span>
                  <a href={itemURL} className="item-title">
                    {truncateHeadline(headline)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
  return null;
};

ListOrderedUnordered.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections').tag({
      name: 'Content',
    }),
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 1,
    }),
    itemLimit: PropTypes.number.tag({
      name: 'Item Limit',
      defaultValue: 1,
    }),
    displayClass: PropTypes.oneOf(['Ordered List', 'Un-ordered List']).tag({
      name: 'Display Class',
      defaultValue: 'Ordered List',
    }),
    title: PropTypes.string.tag({
      name: 'Title',
    }),
  }),
};

export default ListOrderedUnordered;
