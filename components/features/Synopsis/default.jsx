import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import ListItem from '../../_helper_components/home/ListItem/ListItem';
import './default.scss';

const Synopsis = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    customFields: {
      content: { contentService = 'collections-content-api', contentConfigValues } = {},
    },
  } = customFields;

  const data = useContent({
    source: contentService === 'collections-api' ? 'collections-content-api' : contentService,
    query: {
      ...contentConfigValues,
      arcSite,
    },
  });

  if (Array.isArray(data)) {
    return (
      <div className='c-synopsis'>
        {data.map((el, i) => {
          if (i < 2) {
            return (
              <ListItem key={`ListItem-${i}`} {...el} showPreview={true} isSynopsis={true} />
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};

Synopsis.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed', 'sophi']).tag({
      name: 'Content',
    }),
  }),
};

export default Synopsis;
