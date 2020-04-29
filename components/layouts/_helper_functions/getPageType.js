const checkPageType = (type, layout) => {
  const page = {};

  if (type) {
    page.type = type;
    page.isHomeOrSectionPage = type === ('home' || 'section' || 'page');
  } else if (layout) {
    const isHome = layout.indexOf('home') > -1;
    const isSection = layout.indexOf('section') > -1;
    const isList = layout.indexOf('list') > -1;
    const isAuthor = layout.indexOf('author') > -1;
    page.type = layout.substring(0, layout.indexOf('-'));
    page.isHome = isHome;
    page.isSection = isSection;
    page.isList = isList;
    page.isAuthor = isAuthor;
    page.isNonContentPage = true;
    page.isHomeOrSectionPage = isHome || isSection;
  }
  return page;
};

export default checkPageType;
