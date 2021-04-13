import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import ListItem from '../../_helper_components/home/ListItem/ListItem';
import Headline from '../../_helper_components/home/Headline/Headline';
import getColumnsMap from '../../layouts/_helper_functions/homepage/getColumnsMap';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';

const Lead = ({ customFields = {}, limitOverride }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const {
    content: { contentService = 'collections-api', contentConfigValues } = {}, displayClass = '', title = '', columns = 1, moreURL,
  } = customFields;

  let { from: startIndex = 1 } = contentConfigValues || {};
  startIndex = parseInt(startIndex, 10) - 1 > -1 ? parseInt(startIndex, 10) - 1 : 0;

  const displayClassesRequiringImg = [
    '5-Item Feature - Top Photo',
    '5-Item Feature - Left Photo',
    '5-Item Feature - Center Lead Top Photo',
    '5-Item Feature - No Photo',
    'Redesign Feature - Left Photo No Photo',
  ];

  const data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
      displayClass,
      displayClassesRequiringImg,
    },
  });

  const isLeftNoPhotoFeature = displayClass === 'Redesign Feature - Left Photo No Photo';

  function getDisplayClassMap(displayC) {
    switch (displayC) {
      case '5-Item Feature - Top Photo':
        return 'top-photo-display-class';
      case '5-Item Feature - Left Photo':
      case '7-Item TTD Feature':
        return 'left-photo-display-class';
      case '5-Item Feature - No Photo':
        return 'no-photo-display-class';
      case '5-Item Feature - Center Lead Top Photo':
        return 'center-lead-display-class';
      case '1 or 2 Item Feature':
        return 'one-two-item-display-class';
      case 'Redesign Feature - Left Photo No Photo':
        return 'left-photo-no-photo-display-class';
      default:
        return 'top-photo-display-class';
    }
  }

  function getLists(apiData, start, limit, isTTDFeature = false) {
    const listLimit = limitOverride || limit;
    let itemCounter = 0; /* item counter for Left Photo No Feature feature */
    return apiData.map((el, i) => {
      if (start <= i && i < start + listLimit) {
        if (isLeftNoPhotoFeature) itemCounter += 1;
        return <ListItem key={`ListItem-${i}`} displayClass={displayClass} hidePromo={((isLeftNoPhotoFeature && itemCounter !== 1 && itemCounter !== 5) || false)} isTTDFeature={isTTDFeature} {...el} />;
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
      case 'Redesign Feature - Left Photo No Photo':
        return getLists(apiData, startIndex + 1, 5);
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
        return getLists(apiData, startIndex + 1, 3, true);
      case 'Redesign Feature - Left Photo No Photo':
        return getLists(apiData, startIndex + 5, 9);
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
        return getLists(apiData, startIndex + 4, 3, true);
      case '5-Item Feature - Center Lead Top Photo':
        return getLists(apiData, startIndex + 3, 2);
      default:
        return null;
    }
  }

  if (Array.isArray(data) && displayClass === 'Redesign Feature - Left Photo No Photo') {
    return (
      <div
        className={`c-homeLeadContainer left-photo-no-photo-display-class ${getColumnsMap(columns)}`}
      >
        {renderColumn1(displayClass, data) && (
          <div className="column-1 ">{renderColumn1(displayClass, data)}</div>
        )}
        {renderColumn2(displayClass, data) && (
          <div className="column-2">{renderColumn2(displayClass, data)}</div>
        )}
      </div>
    );
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
    displayClass: PropTypes.oneOf(['5-Item Feature - Top Photo', '5-Item Feature - Left Photo', '5-Item Feature - No Photo', '5-Item Feature - Center Lead Top Photo', '1 or 2 Item Feature', '7-Item TTD Feature', 'Redesign Feature - Left Photo No Photo']).tag({
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
