import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import Headline from '../../_helper_components/home/Headline/Headline';
import getColumnsMap from '../../layouts/_helper_functions/homepage/getColumnsMap';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import getLists from '../../layouts/_helper_functions/article/getLists';
import './default.scss';

const Lead = ({
  customFields = {}, limitOverride, displayClassOverride, feature = 'Lead', filterData = false,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite, globalContent } = fusionContext;
  const { _id: id = '' } = globalContent || {};

  const {
    content: { contentService = 'collections-api', contentConfigValues } = {}, displayClass = '', title = '', columns = 1, moreURL,
  } = customFields;

  const actualDisplayClass = displayClassOverride || displayClass;

  const displayClassesRequiringImg = [
    '5-Item Feature - Top Photo',
    '5-Item Feature - Left Photo',
    '5-Item Feature - Center Lead Top Photo',
    '5-Item Feature - No Photo',
    '5-Item Feature - Redesigned Lead - No Photo',
    '5-Item TTD Feature',
    '7-Item TTD Feature',
    'Redesign Feature - Left Photo No Photo',
  ];

  // '5-Item TTD feature' in reality is Editors picks, but effectively the same feature just re-used in article pages//
  const isTTDFeature = actualDisplayClass === '7-Item TTD Feature' || actualDisplayClass === '5-Item TTD Feature';
  const isLeftNoPhotoFeature = actualDisplayClass === 'Redesign Feature - Left Photo No Photo';

  // use squareImageSize to override the default height/width of tease images for cases where we want a square aspect ratio
  let squareImageSize = null;
  // useSquareImageAfter determines _when_ square images take effect.  For example, the TTD feature should only use square images after the first item (which retains the default 16:9 ratio). If your feature uses all square images, you would set this to 0 (as with LeftPhotoNoPhoto display class)
  let useSquareImageAfter = -1;
  if (isTTDFeature) {
    squareImageSize = 110;
    useSquareImageAfter = 1;
  }
  if (isLeftNoPhotoFeature) {
    squareImageSize = 80;
    useSquareImageAfter = 0;
  }


  const data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
      displayClass: actualDisplayClass,
      displayClassesRequiringImg,
      squareImageSize,
      useSquareImageAfter,
      feature,
      excludeTheseStoryIds: filterData ? [id] : [],
    },
  });

  function getDisplayClassMap() {
    switch (actualDisplayClass) {
      case '5-Item Feature - Top Photo':
        return 'top-photo-display-class';
      case '5-Item Feature - Left Photo':
      case '5-Item TTD Feature':
      case '7-Item TTD Feature':
        return 'left-photo-display-class';
      case '5-Item Feature - No Photo':
        return 'no-photo-display-class';
      case '5-Item Feature - Redesigned Lead - No Photo':
        return 'redesigned-no-photo-display-class';
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

  function renderColumn1(apiData) {
    switch (actualDisplayClass) {
      case '5-Item Feature - Center Lead Top Photo':
        return getLists(apiData, 0, 2, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature);
      case '1 or 2 Item Feature':
        return [...Array(parseInt(columns, 10)).keys()].map(i => <Headline key={i} {...apiData[i]} isTease={true} />);
      case '7-Item TTD Feature':
      case '5-Item TTD Feature':
        return <Headline {...apiData[0]} isTease={true} />;
      case 'Redesign Feature - Left Photo No Photo':
        return getLists(apiData, 0, 5, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature);
      default:
        return null;
    }
  }

  function renderColumn2(apiData) {
    switch (actualDisplayClass) {
      case '5-Item Feature - Top Photo':
      case '5-Item Feature - Left Photo':
      case '5-Item Feature - No Photo':
      case '5-Item Feature - Center Lead Top Photo':
      case '5-Item Feature - Redesigned Lead - No Photo':
        return <Headline {...apiData[0]} isTease={true} />;
      case '5-Item TTD Feature':
        return getLists(apiData, 1, 3, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature);
      case '7-Item TTD Feature':
        return getLists(apiData, 1, 3, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature);
      case 'Redesign Feature - Left Photo No Photo':
        return getLists(apiData, 4, 9, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature);
      default:
        return null;
    }
  }

  function renderColumn3(apiData) {
    switch (actualDisplayClass) {
      case '5-Item Feature - Top Photo':
      case '5-Item Feature - Left Photo':
        return getLists(apiData, 1, 4, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature);
      case '5-Item Feature - No Photo':
      case '5-Item Feature - Redesigned Lead - No Photo':
        return (
          <>
            <FeatureTitle title={title} moreURL={moreURL} />
            {getLists(apiData, 1, 4, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature)}
          </>
        );
      case '5-Item TTD Feature':
        return getLists(apiData, 3, 2, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature);
      case '7-Item TTD Feature':
        return getLists(apiData, 4, 3, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature);
      case '5-Item Feature - Center Lead Top Photo':
        return getLists(apiData, 3, 2, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature);
      default:
        return null;
    }
  }

  if (Array.isArray(data)) {
    const column1Output = renderColumn1(data);
    const column2Output = renderColumn2(data);
    const column3Output = !isLeftNoPhotoFeature ? renderColumn3(data) : null;
    return (
      <div className={`c-homeLeadContainer ${getDisplayClassMap()} ${getColumnsMap(columns)}`}>
        {column1Output && <div className="column-1">{column1Output}</div>}
        {column2Output && <div className="column-2">{column2Output}</div>}
        {column3Output && <div className="column-3">{column3Output}</div>}
      </div>
    );
  }
  return null;
};

Lead.propTypes = {
  limitOverride: PropTypes.number,
  displayClassOverride: PropTypes.string,
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
    displayClass: PropTypes.oneOf(['5-Item Feature - Top Photo', '5-Item Feature - Left Photo', '5-Item Feature - No Photo', '5-Item Feature - Redesigned Lead - No Photo', '5-Item Feature - Center Lead Top Photo', '1 or 2 Item Feature']).tag({
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
  feature: PropTypes.string,
  filterData: PropTypes.bool,
};

export default Lead;
