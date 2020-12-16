import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import './default.scss';
import ListItem from '../../_helper_components/home/ListItem/ListItem';

const BigBreakingNews = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    customFields: { content: { contentService = 'collections-api', contentConfigValues } = {} },
  } = customFields;

  let { from: startIndex = 1, size: itemLimit = 0 } = contentConfigValues || {};
  startIndex = parseInt(startIndex, 10) - 1 > -1 ? parseInt(startIndex, 10) - 1 : 0;
  itemLimit = parseInt(itemLimit, 5) || 0;

  const data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
    },
  });


  if (Array.isArray(data)) {
    return (
      <div className="c-bigBreakingNews">
        {data.map((el, i) => {
          console.log('ELEMENT ', el);
          console.log('LOGIC ', startIndex <= i && i < itemLimit + startIndex);
          if (startIndex <= i && i < itemLimit + startIndex) {
            return <ListItem key={`ListItem-${i}`} {...el} />;
          } return null;
        })}
        ;
      </div>
    );
  }
  return null;
};

BigBreakingNews.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
  }),
};

export default BigBreakingNews;
