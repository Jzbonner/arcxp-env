import React from 'react';
import PropTypes from 'prop-types';
import { useComponentContext, useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';

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
      limit: '10',
      section: section || '',
      arcSite,
    },
  });
  if (topStoriesData) {
    return <div className="c-mostRead"><div className="mostReadTitle">Most Read</div>{
      topStoriesData.map((el, i) => (el.title ? <a key={i} href={el.path}><div>{i + 1}: {el.title}</div></a> : null))}
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
