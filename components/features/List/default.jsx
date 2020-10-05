import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getColumnsMap from '../../layouts/_helper_functions/homepage/getColumnsMap';
import ListItem from '../../_helper_components/home/ListItem/ListItem';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';

const List = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite, layout } = fusionContext;
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues } = {},
      displayClass = '',
      columns = 1,
      title = '',
      moreURL = '',
    },
  } = customFields;

  let { from: startIndex = 1, size: itemLimit = 0 } = contentConfigValues || {};
  startIndex = parseInt(startIndex, 10) - 1 > -1 ? parseInt(startIndex, 10) - 1 : 0;
  itemLimit = parseInt(itemLimit, 10) || 0;

  const displayClassesRequiringImg = layout !== 'list-basic'
    ? ['Top Photo', '1 or 2 Item Feature', 'Left Photo', 'Left Photo Small']
    : ['Top Photo', '1 or 2 Item Feature'];

  const data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
      displayClass,
      displayClassesRequiringImg,
    },
  });

  function getDisplayClassMap(displayC) {
    switch (displayC) {
      case 'Top Photo':
        return 'top-photo-display-class';
      case 'Left Photo':
        return 'left-photo-display-class';
      case 'Left Photo Small':
        return 'left-photo-small-display-class';
      case 'No Photo':
        return 'no-photo-display-class';
      case 'Center Lead Top Photo':
        return 'center-lead-display-class';
      case '1 or 2 Item Feature':
        return 'one-two-item-display-class';
      case 'Link':
        return 'link-display-class';
      default:
        return 'top-photo-display-class';
    }
  }

  if (Array.isArray(data)) {
    return (
      <div className="b-margin-bottom-d40-m20">
      <FeatureTitle title={title} moreURL={moreURL} />
        <div
          className={`c-homeListContainer ${getColumnsMap(
            columns,
          )} ${getDisplayClassMap(displayClass)}`}
        >
          {data.map((el, i) => {
            if (startIndex <= i && i < itemLimit + startIndex) {
              return <ListItem key={`ListItem-${i}`} {...el} />;
            }
            return null;
          })}
        </div>
      </div>
    );
  }
  return null;
};

List.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
    displayClass: PropTypes.oneOf([
      'Top Photo',
      'Left Photo',
      'Left Photo Small',
      'No Photo',
      'Link',
    ]).tag({
      name: 'Display Class',
      defaultValue: 'Top Photo',
    }),
    columns: PropTypes.oneOf(['1', '2', '3', '4']).tag({
      name: 'Columns',
      defaultValue: '1',
    }),
    title: PropTypes.string.tag({
      name: 'Title - Top, Left, No Photo Display Classes Only',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
  }),
};

export default List;
