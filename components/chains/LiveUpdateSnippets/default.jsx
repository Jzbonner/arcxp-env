import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import handleSiteName from '../../layouts/_helper_functions/handleSiteName';
import fetchEnv from '../../_helper_components/global/utils/environment';
import Image from '../../_helper_components/global/image/default';
import PageTitle from '../../features/pageTitle/default';
import './default.scss';

const LiveUpdateSnippets = (props) => {
  const contentConfigValues = props?.customFields?.content?.contentConfigValues;
  const maxSnippets = props?.customFields?.maxSnippets || 5;
  const isLive = props?.customFields?.live;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const titleCustomFields = props?.childProps.filter(
    childProp => childProp.type === 'pageTitle/default',
  )[0];
  const imageCustomFields = props?.childProps.filter(
    childProp => childProp.type === 'Image/default',
  )[0];

  const embedData = useContent({
    source: 'query-feed',
    query: {
      ...contentConfigValues,
      arcSite,
    },
  });

  const siteDomain = `${
    fetchEnv() === 'prod' ? 'www' : 'sandbox'
  }.${handleSiteName(arcSite)}.com`;

  if (Array.isArray(embedData)) {
    return (
      <div className="c-liveUpdateSnippets b-margin-bottom-d40-m20">
        <div className="liveUpdateSnippets-header">
          <div className={`glow ${isLive ? 'is-live' : 'is-not-live'}`}></div>
          <span className={`${isLive ? '' : 'is-not-live'}`}>Live</span>
          <div className="border border-horizontal"></div>
        </div>
        <div className="liveUpdateSnippets-body">
          <div className="col col-1">
            <PageTitle customFields={{ ...titleCustomFields?.customFields }} />
            <Image
              src={{
                url: `https://${siteDomain}${imageCustomFields?.customFields?.src}`,
                alt_text: imageCustomFields?.customFields?.alt,
                credits: imageCustomFields?.customFields?.credit,
                caption: imageCustomFields?.customFields?.caption,
              }}
              imageType="isHomepageImage"
              layout="fixed"
              width={500}
              height={282}
            />
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
                    <a href={data.canonical_url} className="content">
                      {data.headlines.basic}
                    </a>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

LiveUpdateSnippets.propTypes = {
  childProps: PropTypes.obj,
  customFields: PropTypes.shape({
    live: PropTypes.bool.tag({
      name: 'Are these updates live?',
      defaultValue: false,
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
