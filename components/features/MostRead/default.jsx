import React from 'react';
import PropTypes from 'prop-types';
import { useComponentContext, useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import mostReadFilter from '../../../content/filters/most-read';

const MostRead = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { chartbeat } = getProperties(arcSite);
  const { host } = chartbeat;
  const componentContext = useComponentContext();
  const { section } = componentContext && componentContext.customFields;
  const topStoriesData = useContent({
    source: 'most-read',
    query: {
      host,
      limit: '5',
      section: section || '',
    },
    filter: mostReadFilter,
  });

  // let newData;
  // if (topStoriesData && topStoriesData.pages) {
  //   newData = topStoriesData.pages.filter(pages => pages.stats.type === 'Article');
  //   console.log(newData);
  // }
  // if (topStoriesData && topStoriesData.pages && topStoriesData.pages.length < 5) {
  //   const newData = useContent({
  //     source: 'most-read',
  //     query: {
  //       host: 'ajc.com',
  //       limit: '6',
  //       section: '',
  //     },
  //     filter: mostReadFilter,
  //   });
  //   data = newData;
  // }
  console.log(topStoriesData);
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
