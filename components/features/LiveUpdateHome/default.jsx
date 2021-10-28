import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import Image from '../../_helper_components/global/image/default';
import './default.scss';

const LiveUpdateHome = ({ customFields }) => {
  const contentConfigValues = customFields?.content.contentConfigValues;
  const maxSnippets = customFields?.maxSnippets;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const embedData = useContent({
    source: 'query-feed',
    query: {
      ...contentConfigValues,
      arcSite,
    },
  });

  const requestUri = 'http://localhost/pf/antonio-homepage-one/?_website=ajc&outputType=json';
  axios.get(requestUri).then(({ data }) => {
    console.log(data);
  });

  if (embedData) {
    return (
      <div className="c-liveUpdateHome b-margin-bottom-small">
        <div className="liveUpdateHome-header">
          <div className="glow live"></div>
          Live
          <div className="border border-horizontal"></div>
        </div>
        <div className="liveUpdateHome-body">
          <div className="col col-1">
            <h2 className="liveupdate-headline">
              {embedData[0]?.headlines?.basic}
            </h2>
            <Image
              src={{ url: embedData[0]?.promo_items?.basic?.promo_image?.url }}
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
                    key={`liveUpdateHome-update-${i}`}
                    className="liveUpdateHome-update"
                  >
                    <div className="header">
                      <div className="glow"></div>
                      <div className="border border-vertical"></div>
                    </div>
                    <div className="content">{data.headlines.basic}</div>
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

LiveUpdateHome.propTypes = {

  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['query-feed']).tag({
      name: 'Content',
    }),
    maxSnippets: PropTypes.number,
  }),
};

LiveUpdateHome.label = 'Live Update Home';

export default LiveUpdateHome;
