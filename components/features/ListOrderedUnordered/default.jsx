import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import truncateHeadline from '../../layouts/_helper_functions/homepage/truncateHeadline';
import getColumnsMap from '../../layouts/_helper_functions/homepage/getColumnsMap';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';

const ListOrderedUnordered = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      displayClass = '', columns = 1, title = '', moreURL = '',
    },
  } = customFields;

  let { size: itemLimit } = contentConfigValues || {};
  itemLimit = parseInt(itemLimit, 10) || 10;

  const data = useContent({
    source: contentService,
    query: { ...contentConfigValues, arcSite },
  });

  if (Array.isArray(data)) {
    const filteredData = data.slice(0, itemLimit);

    return (
      <div className={`c-${displayClass} b-margin-bottom-d30-m20`}>
        <FeatureTitle title={title} moreURL={moreURL} />
        <ul className={`c-list-box ${getColumnsMap(columns)}`}>
          {filteredData.map((el, i) => {
            const { basic: headline } = el.headlines ? el.headlines : '';
            const { canonical_url: itemURL } = el || '';
            const countOrdered = i + 1 > 9 ? i + 1 : `0${i + 1}`;
            return (
              <li className="list-item" key={i}>
                <span className={`item-index-${displayClass}`}>{displayClass === 'Ordered List' ? countOrdered : ''}</span>
                <a href={itemURL} className="item-title">
                  {truncateHeadline(headline, true)}
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
    content: PropTypes.contentConfig(['collections', 'query-feed', 'sophi']).tag({
      name: 'Content',
    }),
    displayClass: PropTypes.oneOf(['Ordered List', 'Un-ordered List']).tag({
      name: 'Display Class',
      defaultValue: 'Ordered List',
    }),
    columns: PropTypes.oneOf(['1', '2', '3', '4']).tag({
      name: 'Columns',
      defaultValue: '1',
    }),
    title: PropTypes.string.tag({
      name: 'Title',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
  }),
};

export default ListOrderedUnordered;
