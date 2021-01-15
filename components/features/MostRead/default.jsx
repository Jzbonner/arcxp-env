import React from 'react';
import PropTypes from 'prop-types';
import { useComponentContext } from 'fusion:context';
import { useContent } from 'fusion:content';

const MostRead = () => {
  const componentContext = useComponentContext();
  const { section } = componentContext && componentContext.customFields;
  const topStoriesData = useContent({
    source: 'most-read',
    query: {
      host: 'ajc.com',
      limit: '5',
      section: `${section}` || '',
    },
  });
  console.log(topStoriesData);
  if (topStoriesData && topStoriesData.pages && topStoriesData.pages.length < 5) {
    console.log('Uh oh we have less than 5 results');
  }
  if (topStoriesData && topStoriesData.pages) {
    console.log(topStoriesData.pages);
    return <div> <div>Most Read</div>{
      topStoriesData.pages.map((el, i) => (el.title ? <a key={i} href={el.path}><div>{i + 1}: {el.title}</div></a> : null))}
      </div>;
  }

  return null;
};

MostRead.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      label: 'Add Section(s) Name',
    }),
  }),
};

export default MostRead;
