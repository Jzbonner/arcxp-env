export default (site) => {
  if (site === 'dayton-daily-news' || site === 'springfield-news-sun') {
    const newSite = site.replace(/-/g, '');
    return newSite;
  }
  return site;
};
