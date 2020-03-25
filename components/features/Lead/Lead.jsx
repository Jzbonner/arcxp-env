import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import ListItem from '../../_helper_components/home/ListItem/ListItem';
import Headline from '../../_helper_components/home/Headline/Headline';
import getColumnsMap from '../../layouts/_helper_functions/homepage/getColumnsMap';
import './Lead.scss';

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

  function getLists(listData, start, limit) {
    return listData.data.map((el, i) => {
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
        return [...Array(columns).keys()].map(i => <Headline key={i} {...apiData.data[startIndex - 1 + i]} />);
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
        return <Headline {...apiData.data[startIndex - 1]} />;
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
            {title && <div className="title">{title}</div>}
            {getLists(data, startIndex, itemLimit)}
          </>
        );
      case '5-Item Feature - Center Lead Top Photo':
        return getLists(data, startIndex + 2, itemLimit - 2);
      default:
        return null;
    }
  }

  if (data) {
    return (
      <div className={`c-homeLeadContainer b-margin-bottom-d30-m20 ${getDisplayClassMap(displayClass)} ${getColumnsMap(columns)}`}>
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
