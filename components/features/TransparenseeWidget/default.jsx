import React from 'react';
import InnerHTML from 'dangerously-set-html-content';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import checkWindowSize from '../../_helper_components/global/utils/check_window_size/default';
import './default.scss';
// import renderCustomHtml from '../../_helper_components/article/contentElements/components/html/renderCustomHtml';

const TransparenseeWidget = () => {
  const { siteName } = getProperties();
  const widgetURL = `https://events.${siteName}.com/api/v1/streams?guid=methode-search-widget`;

  const callback = useContent({
    source: 'widget',
    query: {
      url: `${widgetURL}`,
    },
  });


  if (callback) {
    const screenSize = checkWindowSize();
    const isMobile = screenSize.width < 768;
    const { payload } = callback || {};
    return (
      <div className="c-transparenseeWidget b-margin-bottom-d30-m20" style={{ width: '100%' }}>
        <link href="https://fonts.googleapis.com/css?family=Oswald:400,300,700" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
          {!isMobile ? (
          <InnerHTML html={payload} id="ttd-search-widget"
          className="hidden--small"
          data-searchurl="events.ajc.com"/>
          ) : ''}
          {isMobile ? (
            <div className="hidden--medium hidden--large">
            <form className="ttd-search" action="//events.ajc.com/events" method="get">
              <input className="ttd-search__input" type="text" name="search" placeholder="Search for an event or movie" />
              <input
                className="ttd-search__submit"
                alt="submit"
                name="submit"
                type="image"
                src="https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/images/icons/search-icon.svg"
              />
            </form>
          </div>
          ) : ''}
      </div>
    );
  }
  return null;
};

export default TransparenseeWidget;
