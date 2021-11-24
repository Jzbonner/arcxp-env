import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import './default.scss';

const LiveUpdateSnippets = ({ children, customFields }) => {
  const contentConfigValues = customFields?.content?.contentConfigValues;
  const liveUpdatesURI = customFields?.liveUpdatesURI;
  const maxSnippets = customFields?.maxSnippets || 5;
  const isLive = customFields?.live;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const embedData = useContent({
    source: 'query-feed',
    query: {
      ...contentConfigValues,
      arcSite,
    },
  });

  if (Array.isArray(embedData)) {
    return (
      <div className="c-liveUpdateSnippets b-margin-bottom-d40-m20">
        <div className="liveUpdateSnippets-header">
          <div className={`glow ${isLive ? 'is-live' : 'is-not-live'}`}></div>
            <span className={`${isLive ? '' : 'is-not-live'}`}>LIVE</span>
          <div className="border border-horizontal"></div>
        </div>
        <div className="liveUpdateSnippets-body">
          <div className='c-liveUpdatesContainer'>
            <div className="col col-1">
            <a href={`/${liveUpdatesURI}`}>
              {children[0]}
              {children[1]}
              </a>
            </div>
            <div className="col col-2">
              {embedData.map((data, i) => {
                if (i < maxSnippets) {
                  return (
                    <div
                      key={`liveUpdateSnippets-update-${i}`}
                      className="liveUpdateSnippets-update"
                    >
                      <div className="header">
                        <div className="glow"></div>
                        <div className="border border-vertical"></div>
                      </div>
                      <a href={`/${liveUpdatesURI}/#${data._id}`} className="content">
                        {data.headlines.basic}
                      </a>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          {children[2] && <div className='col col-3'>
           {children[2]}
          </div>
          }
        </div>
      </div>
    );
  }
  return null;
};

LiveUpdateSnippets.propTypes = {
  children: PropTypes.array,
  customFields: PropTypes.shape({
    live: PropTypes.bool.tag({
      name: 'Are these updates live?',
      defaultValue: false,
    }),
    liveUpdatesURI: PropTypes.string.tag({
      name: 'URI of Live Updates Page',
    }),
    maxSnippets: PropTypes.number.tag({
      name: 'Max Snippets to show:',
      defaultValue: 5,
    }),
    content: PropTypes.contentConfig(['query-feed']).tag({
      name: 'Content',
    }),
  }),
};

LiveUpdateSnippets.label = 'Live Update Snippets';

export default LiveUpdateSnippets;
