import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';

const Columnist = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {}, title = 'Columnists', moreURL = '',
    },
  } = customFields;

  const { size } = contentConfigValues;

  const data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
    },
  });

  if (Array.isArray(data)) {
    return (
      <div className="c-columnistFeature">
        <FeatureTitle title={title && title.length > 0 ? title : 'Columnists'} moreURL={moreURL} />
        <ul className="c-columnistList">
          {data.map((story, idx) => {
            const {
              name: authorName,
              url: authorURL,
            } = story && story.credits && story.credits.by && story.credits.by[0] ? story.credits.by[0] : {};
            const { basic: headline } = story && story.headlines && story.headlines.basic ? story.headlines : {};
            const { canonical_url: articleURL } = story && story.canonical_url ? story : {};
            if (idx < size) {
              return (
                <li className="c-singleStory" key={idx}>
                  <a href={authorURL} className='authorName'>
                    {authorName}
                  </a>
                  <a href={articleURL} className="headline">
                    {headline}
                  </a>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
  }

  return null;
};

Columnist.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections').tag({
      name: 'Content',
    }),
    title: PropTypes.string.tag({
      name: 'Columnists Title',
      defaultValue: 'Columnists',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
  }),
};

export default Columnist;
