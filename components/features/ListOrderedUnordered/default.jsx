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
    customFields: { content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {}, displayClass = '', title = '' },
  } = customFields;

  let { from: startIndex, size: itemLimit } = contentConfigValues || {};
  startIndex = parseInt(startIndex, 10) - 1 || 0;
  itemLimit = parseInt(itemLimit, 10) || 10;

  const data = useContent({
    source: contentService,
    query: { ...contentConfigValues, arcSite },
  });

  if (Array.isArray(data)) {
    const limitResult = startIndex + itemLimit; // making sure the limit adds the index, so it doesn't reduce number of results
    const filteredData = data.slice(startIndex, limitResult); // filtering data based on startIndex & itemLimit (user input)

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
  return null;
};

ListOrderedUnordered.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections').tag({
      name: 'Content',
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
