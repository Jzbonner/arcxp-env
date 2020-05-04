import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import getColumnsMap from '../../layouts/_helper_functions/homepage/getColumnsMap';
import ListItem from '../../_helper_components/home/ListItem/ListItem';
import filterElementsWithoutImages from '../../layouts/_helper_functions/homepage/filterElementsWithoutImages';
import './default.scss';

const List = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      displayClass = '',
      startIndex = 1,
      itemLimit = 100,
      columns = 1,
      title = '',
    },
  } = customFields;

  let data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  const displayClassesRequiringImg = ['Top Photo', '1 or 2 Item Feature'];
  data = filterElementsWithoutImages(data, displayClass, displayClassesRequiringImg);

  function getDisplayClassMap(displayC) {
    switch (displayC) {
      case 'Top Photo':
        return 'top-photo-display-class';
      case 'Left Photo':
        return 'left-photo-display-class';
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

  if (data) {
    return (
      <div className="b-margin-bottom-d15-m10">
        {title && <div className="b-sectionTitle">{title}</div>}
        <div className={`c-homeListContainer ${getColumnsMap(columns)} ${getDisplayClassMap(displayClass)}`}>
          {data.content_elements.map((el, i) => {
            if (startIndex - 1 <= i && i < itemLimit + startIndex - 1) {
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
    content: PropTypes.contentConfig('collections', 'query-feed').tag({
      name: 'Content',
    }),
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 1,
    }),
    itemLimit: PropTypes.number.tag({
      name: 'Item Limit',
      defaultValue: 100,
    }),
    displayClass: PropTypes.oneOf(['Top Photo', 'Left Photo', 'No Photo', 'Link']).tag({
      name: 'Display Class',
      defaultValue: 'Top Photo',
    }),
    columns: PropTypes.oneOf([1, 2, 3, 4]).tag({
      name: 'Columns',
      defaultValue: 1,
    }),
    title: PropTypes.string.tag({
      name: 'Title - Top, Left, No Photo Display Classes Only',
    }),
  }),
};

export default List;
