import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import ListItem from '../../_helper_components/home/ListItem/ListItem';
import './default.scss';

const DontMiss = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues } = {},
      title = '',
    },
  } = customFields;

  const { size } = contentConfigValues;

  const data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
    },
  });

  if (Array.isArray(data)) {
    return (
      <div className="c-dontMiss">
        <FeatureTitle title={title}/>
        <div className="c-homeListContainer no-photo-display-class dontMissFeature">
        {data.map((el, i) => {
          if (i < size) {
            return <ListItem key={`ListItem-${i}`} {...el} isDontMissFeature/>;
          } return null;
        })}
        </div>
      </div>);
  }
  return null;
};

DontMiss.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed', 'sophi']).tag({
      name: 'Content',
    }),
    title: PropTypes.string.tag({
      name: 'Title ',
    }),
  }),
};

export default DontMiss;
