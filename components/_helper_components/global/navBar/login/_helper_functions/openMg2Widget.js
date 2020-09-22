const openMg2Widget = (siteCode, userState = null) => {
  const params = {
    siteCode,
    subscriberOnly: false,
    viewMode: 'Tabs',
  };

  if (userState === 'authenticated') {
    params.subscriberOnly = true;
  }

  if (window && window.mg2WidgetAPI && window.mg2WidgetAPI.openNewsletter) {
    window.mg2WidgetAPI.openNewsletter(params);
  }
};

export default openMg2Widget;
