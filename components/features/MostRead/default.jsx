import React from 'react';
import PropTypes from 'prop-types';
import { useComponentContext, useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import './default.scss';

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
    let counter = 0;
    return <div className="c-mostRead"><div className="mostReadTitle">Most Read</div>
      <div className="mostReadList"> {
        topStoriesData.map((el, i) => {
          if (el.title && i < 5) {
            counter += 1;
            return <a key={i} href={el.path}><div className="mostReadRanking">{counter}</div><div className="mostReadHeadline">{el.title}</div></a>;
          }
          return null;
        })
        }
      </div>
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
