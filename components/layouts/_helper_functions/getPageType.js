const checkPageType = (type, layout) => {
  const page = {};

  if (type && type !== 'collection') {
    page.type = type;
    page.isHomeOrSectionPage = false;
  } else if (layout) {
    const isHome = layout.indexOf('home') > -1;
    const isSection = layout.indexOf('section') > -1 || layout.indexOf('staff') > -1 || layout.indexOf('wrap') > -1;
    const isList = layout.indexOf('list') > -1;
    const isAuthor = layout.indexOf('author') > -1;
    const isWrap = layout.indexOf('wrap') > -1;
    page.type = layout.substring(0, layout.indexOf('-'));
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
