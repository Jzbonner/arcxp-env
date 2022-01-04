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
  const { section, storyCount = null, title = '' } = componentContext && componentContext.customFields;
  const storyLimit = storyCount || '10';
  const topStoriesData = useContent({
    source: 'most-read',
    query: {
      host,
      limit: storyLimit,
      section: section || '',
      arcSite,
    },
  });

  if (topStoriesData) {
    let counter = 0;
    const mapLimit = storyCount || 5;
    return <div className="c-mostRead"><div className="mostReadTitle">{`${title || 'Most Read'}`}</div>
      <div className="mostReadList"> {
        topStoriesData.map((el) => {
          if (el.title && counter < mapLimit) {
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
    title: PropTypes.string.tag({
      label: 'Replaces MostRead feature title',
    }),
    storyCount: PropTypes.oneOf(['5', '10', '15', '20', '25', '30', '35', '40', '45', '50']).tag({
      name: 'Number of stories to display',
    }),
  }),
};

export default MostRead;
