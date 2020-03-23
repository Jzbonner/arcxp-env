import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import ListItem from '../../_helper_components/home/ListItem/ListItem';
import Headline from '../../_helper_components/home/Headline/Headline';
import './Lead.scss';

const Lead = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      displayClass = '',
      startIndex = 1,
      title = '',
    },
  } = customFields;

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
      default:
        return 'top-photo-display-class';
    }
  }

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  function getLists(listData, start, limit) {
    return listData.data.map((el, i) => {
      if (start <= i && i < start + limit) {
        return <ListItem key={`ListItem-${i}`} {...el} />;
      }
      return null;
    });
  }

  function renderColumn1(displayC, apiData) {
    switch (displayC) {
      case 'Center Lead Top Photo':
        return getLists(apiData, startIndex, 2);
      default:
        return null;
    }
  }

  function renderColumn2(displayC, apiData) {
    switch (displayC) {
      case 'Top Photo':
      case 'Left Photo':
      case 'No Photo':
      case 'Center Lead Top Photo':
        return <Headline {...apiData.data[0]} />;
      default:
        return null;
    }
  }

  function renderColumn3(displayC, apiData) {
    switch (displayC) {
      case 'Top Photo':
      case 'Left Photo':
        return getLists(apiData, startIndex, 4);
      case 'No Photo':
        return (
          <>
            {title && <div className="title">{title}</div>}
            {getLists(data, startIndex, 4)}
          </>
        );
      case 'Center Lead Top Photo':
        return getLists(data, startIndex + 2, 2);
      default:
        return null;
    }
  }

  if (data) {
    return (
      <div className={`c-homeLeadContainer b-margin-bottom-d30-m20 ${getDisplayClassMap(displayClass)}`}>
        {renderColumn1(displayClass, data) && <div className="column-1">{renderColumn1(displayClass, data)}</div>}
        {renderColumn2(displayClass, data) && <div className="column-2">{renderColumn2(displayClass, data)}</div>}
        {renderColumn3(displayClass, data) && <div className="column-3">{renderColumn3(displayClass, data)}</div>}
      </div>
    );
  }
  return null;
};

Lead.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections']).tag({
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
    displayClass: PropTypes.oneOf(['Top Photo', 'Left Photo', 'No Photo', 'Center Lead Top Photo']).tag({
      name: 'Display Class',
      defaultValue: 'Top Photo',
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
