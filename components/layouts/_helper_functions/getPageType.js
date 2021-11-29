
const checkPageType = (type, layout, renderedOutput) => {
  const page = {};

  if (type && type !== 'collection') {
    page.type = type;
    page.isHomeOrSectionPage = false;
  } else if (layout) {
    const isSectionPage = layout.indexOf('section') > -1;
    const pageTitleArray = [];
    const features = isSectionPage && Array.isArray(renderedOutput) && renderedOutput.map((element) => {
      if (element && element.collection === 'features' && element.type) {
        if (element.type === 'pageTitle/default') {
          pageTitleArray.push(element);
        }
        return element.type;
      }
      return null;
    });
    // checking if page has thirdPartyFeature
    const isThirdPartyFeature = isSectionPage && Array.isArray(features)
          && features.includes('ThirdPartyTease/default');
    const pageTitleElement = isSectionPage && Array.isArray(features) && features.includes('pageTitle/default')
          && pageTitleArray.length ? pageTitleArray[0] : null;
    // Retrieving the pageTitle from pageTitleElement
    const { customFields: { pageTitle = '' } = {} } = pageTitleElement
          && pageTitleElement.props ? pageTitleElement.props : {};
    const isHome = layout.indexOf('home') > -1;
    const isSection = isSectionPage || layout.indexOf('wrap') > -1;
    const isList = layout.indexOf('list') > -1;
    const isStaff = layout.includes('all-staff');
    const isWrap = layout.indexOf('wrap') > -1;
    const isAuthor = layout.includes('staff-bio-basic');
    const isError = isSectionPage && features && features.includes('404/default');
    const isLiveUpdate = isSectionPage && features && features.includes('ComposerEmbed/default');
    const isEnhancedList = isSectionPage && features && features.includes('ListEnhanced/default');
    const isWeather = isSectionPage && isThirdPartyFeature && pageTitle
                      && pageTitle.toLowerCase().includes('weather');
    const isTraffic = isSectionPage && isThirdPartyFeature && pageTitle
                      && pageTitle.toLowerCase().includes('traffic');
    page.type = layout.substring(0, layout.indexOf('-'));
    page.isStaff = isStaff;
    page.isWeather = isWeather;
    page.isTraffic = isTraffic;
    page.isEnhancedList = isEnhancedList;
    page.isError = isError;
    page.isLiveUpdate = isLiveUpdate;
    page.isHome = isHome;
    page.isSection = isSection;
    page.isList = isList;
    page.isAuthor = isAuthor;
    page.isWrap = isWrap;
    page.isNonContentPage = true;
    page.isHomeOrSectionPage = isHome || isSection;
  }
  return page;
};

export default checkPageType;
