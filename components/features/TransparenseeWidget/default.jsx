import React from 'react';
import { useContent } from 'fusion:content';
import checkWindowSize from '../../_helper_components/global/utils/check_window_size/default';
import renderCustomHtml from '../../_helper_components/article/contentElements/components/html/renderCustomHtml';

const TransparenseeWidget = () => {
  const callback = useContent({
    source: 'widget',
  });

  if (callback) {
    const screenSize = checkWindowSize();
    const isMobile = screenSize.width < 768;
    const { payload } = callback || {};
    return (
      <div className="c-transparenseeWidget">
        <link href="https://fonts.googleapis.com/css?family=Oswald:400,300,700" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
          {!isMobile ? (
            <div
            id="ttd-search-widget"
            className="hidden--small"
            data-searchurl="events.ajc.com"
            dangerouslySetInnerHTML={{ __html: renderCustomHtml(payload) }}
          ></div>
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
