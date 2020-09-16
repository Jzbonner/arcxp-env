import React from 'react';
import { useContent } from 'fusion:content';
import ListItem from '../../home/ListItem/ListItem';

const RelatedList = ({ taxonomy, uuid }) => {
  const { primary_section: primarySection } = taxonomy || {};
  const { path, referent } = primarySection || {};
  const { id: referentId } = referent || {};


  let finalReferentId;
  if (referentId) {
    [, finalReferentId] = referentId.split('/');
  }

  const formattedPath = path ? path.substring(1) : finalReferentId || null;
  console.log('formattedPath', formattedPath);

  debugger;
  const relatedStoryData = useContent({
    source: 'search-api',
    query: {
      published: true,
      section: formattedPath,
      sort: true,
      size: 8,
    },
  });

  console.log('relatedStoryData', relatedStoryData);

  return <h1>wEWFOWHFOIWHEFOHIWOFHOWIHFOIHWEFOIHWEOFIHOWIHFOIWHEF</h1>;

};

export default RelatedList;
