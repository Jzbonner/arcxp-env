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

  /*
    APD-1654: If the storyCount custom field is being used, then we must set all stories into rows of 5 per UX request.
    If not, then the old story-item handling logic will execute.
  */

  const buildMostReadRows = (storyCountConfig) => {
    const storyRows = [];
    let storyItems = [];
    let counter = 0;
    let totalCount = 0;

    if (storyCountConfig) {
      topStoriesData.forEach((el, i) => {
        if (counter === 5 || (counter < 5 && topStoriesData.length - 1 === i)) {
          storyRows.push(<div className={`mostReadList ${storyRows.length >= 1 ? 'sub-row' : ''}`}>{storyItems}</div>);
          storyItems = [];
          counter = 0;
        }

        if (el.title) {
          counter += 1;
          totalCount += 1;
          storyItems.push(<a key={`Headline: ${el.title}`} href={`https://${env === 'prod' ? 'www.' : ''}${el.path}`} target="_self"><div className={`mostReadRanking ${totalCount >= 10 ? 'multi-digit' : ''}`}>{totalCount}</div><div></div><div className="mostReadHeadline">{truncateHeadline(el.title)}</div></a>);
        }
      });
      return storyRows;
    }

    /* mostRead logic for default max of 5 visible items */
    topStoriesData.forEach((el) => {
      if (el.title && counter < 5) {
        counter += 1;
        storyItems.push(<a key={`Headline: ${el.title}`} href={`https://${env === 'prod' ? 'www.' : ''}${el.path}`} target="_self"><div className="mostReadRanking">{counter}</div><div></div><div className="mostReadHeadline">{truncateHeadline(el.title)}</div></a>);
      }
      return null;
    });

    storyRows.push(<div className="mostReadList">{storyItems}</div>);

    return storyRows;
  };

  if (topStoriesData) {
    return <div className="c-mostRead"><div className="mostReadTitle">{`${title || 'Most Read'}`}</div>
      {buildMostReadRows(storyCount)}
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
      label: 'Replaces MostRead title',
    }),
    storyCount: PropTypes.oneOf(['5', '10', '15', '20', '25', '30']).tag({
      name: 'Number of stories to display',
    }),
  }),
};

export default MostRead;
