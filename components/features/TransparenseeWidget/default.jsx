import React from 'react';
import axios from 'axios';

const TransparenseeWidget = () => {
  const widgetURL = 'https://events.ajc.com/api/v1/streams?guid=methode-search-widget';
  return axios
    .get(widgetURL)
    .then(({ data }) => (
      <div className="c-widget">
        <link href="https://fonts.googleapis.com/css?family=Oswald:400,300,700" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
        <div
          id="ttd-search-widget"
          className="hidden--small"
          data-searchurl="events.ajc.com"
          dangerouslySetInnerHTML={{ __html: data.payload }}
        ></div>
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
      </div>
    ))
    .catch(error => console.log(error));
};

export default TransparenseeWidget;
