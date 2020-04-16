const checkPageType = (type, layout) => {
  const page = {};

  if (type) {
    page.type = type;
    page.isHomeOrSectionPage = type === ('home' || 'section' || 'page');
  } else if (layout) {
    const isHome = layout.indexOf('home') > -1;
    const isSection = layout.indexOf('section') > -1;
    page.isHome = isHome;
    page.isSection = isSection;
    page.isHomeOrSectionPage = isHome || isSection;
  }
  return page;
};

export default checkPageType;
