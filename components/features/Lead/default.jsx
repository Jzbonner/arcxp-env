import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import ListItem from '../../_helper_components/home/ListItem/ListItem';
import Headline from '../../_helper_components/home/Headline/Headline';
import getColumnsMap from '../../layouts/_helper_functions/homepage/getColumnsMap';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import Synopsis from '../Synopsis/default';
import './default.scss';

const Lead = ({ customFields = {}, limitOverride }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const {
    content: { contentService = 'collections-api', contentConfigValues } = {}, displayClass = '', title = '', columns = 1, moreURL,
  } = customFields;

  let { from: startIndex = 1 } = contentConfigValues || {};
  startIndex = parseInt(startIndex, 10) - 1 > -1 ? parseInt(startIndex, 10) - 1 : 0;

  const displayClassesRequiringImg = ['5-Item Feature - Top Photo', '5-Item Feature - Left Photo', '5-Item Feature - Center Lead Top Photo', '5-Item Feature - No Photo'];

  const data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
      displayClass,
      displayClassesRequiringImg,
    },
  });

  console.log('DATA FROM LEAD ', data);

  const synopsisCustomFields = {
    customFields: {
      ...customFields,
      content: {
        ...customFields.content,
        contentConfigValues: {
          ...customFields.content.contentConfigValues,
          from: startIndex + 6,
          size: 2,
        },
      },
    },
  };

  console.log('synopsisCustomFields ', synopsisCustomFields);

  function getDisplayClassMap(displayC) {
    switch (displayC) {
      case '5-Item Feature - Top Photo':
        return 'top-photo-display-class';
      case '5-Item Feature - Left Photo':
        return 'left-photo-display-class';
      case '5-Item Feature - No Photo':
      case '7-Item TTD Feature':
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
    const listLimit = limitOverride || limit;
    return apiData.map((el, i) => {
      if (start <= i && i < start + listLimit) {
        return <ListItem key={`ListItem-${i}`} {...el} />;
      }
      return null;
    });
  }

  function renderColumn1(displayC, apiData) {
    switch (displayC) {
      case '5-Item Feature - Center Lead Top Photo':
        return getLists(apiData, startIndex + 1, 2);
      case '1 or 2 Item Feature':
        return [...Array(parseInt(columns, 10)).keys()].map(i => <Headline key={i} {...apiData[startIndex + i]} isTease={true} />);
      case '7-Item TTD Feature':
        return <Headline {...apiData[startIndex]} isTease={true} />;
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
        return <Headline {...apiData[startIndex]} isTease={true} />;
      case '7-Item TTD Feature':
        return (
          <>
            {getLists(apiData, startIndex + 1, 4)}
            {/* <Synopsis {...synopsisCustomFields}/> */}
          </>
        );
      default:
        return null;
    }
  }

  function renderColumn3(displayC, apiData) {
    switch (displayC) {
      case '5-Item Feature - Top Photo':
      case '5-Item Feature - Left Photo':
        return getLists(apiData, startIndex + 1, 4);
      case '5-Item Feature - No Photo':
        return (
          <>
            <FeatureTitle title={title} moreURL={moreURL} />
            {getLists(apiData, startIndex + 1, 4)}
          </>
        );
      case '7-Item TTD Feature':
        return <Synopsis {...synopsisCustomFields} />;
      case '5-Item Feature - Center Lead Top Photo':
        return getLists(apiData, startIndex + 3, 2);
      default:
        return null;
    }
  }

  if (Array.isArray(data)) {
    return (
      <div className={`c-homeLeadContainer ${getDisplayClassMap(displayClass)} ${getColumnsMap(columns)}`}>
        {renderColumn1(displayClass, data) && <div className="column-1">{renderColumn1(displayClass, data)}</div>}
        {renderColumn2(displayClass, data) && <div className="column-2">{renderColumn2(displayClass, data)}</div>}
        {renderColumn3(displayClass, data) && <div className="column-3">{renderColumn3(displayClass, data)}</div>}
      </div>
    );
  }
  return null;
};

Lead.propTypes = {
  limitOverride: PropTypes.number,
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
    displayClass: PropTypes.oneOf(['5-Item Feature - Top Photo', '5-Item Feature - Left Photo', '5-Item Feature - No Photo', '5-Item Feature - Center Lead Top Photo', '1 or 2 Item Feature', '7-Item TTD Feature']).tag({
      name: 'Display Class',
      defaultValue: '5-Item Feature - Top Photo',
    }),
    columns: PropTypes.oneOf(['1', '2', '3', '4']).tag({
      name: 'Columns',
      defaultValue: '1',
    }),
    title: PropTypes.string.tag({
      name: 'Title - No Photo Display Class Only',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
  }),
};

export default Lead;
