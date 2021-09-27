import React from 'react';
import PropTypes from 'prop-types';
import { useComponentContext, useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import './default.scss';
import fetchEnv from '../../_helper_components/global/utils/environment';
import truncateHeadline from '../../layouts/_helper_functions/homepage/truncateHeadline';

const MostRead = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { chartbeat } = getProperties(arcSite);
  const { host } = chartbeat;
  const env = fetchEnv();
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
        topStoriesData.map((el) => {
          if (el.title && counter < 5) {
            counter += 1;
            return <a key={`Headline: ${el.title}`} href={`https://${env === 'prod' ? 'www.' : ''}${el.path}`} target="_self"><div className="mostReadRanking">{counter}</div><div></div><div className="mostReadHeadline">{truncateHeadline(el.title)}</div></a>;
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
