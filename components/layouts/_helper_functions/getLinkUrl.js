export default (link) => {
  if (link && link._id && link._id.includes('configsection')) {
    if (link.site && link.site.site_url) {
      return link.site.site_url;
    }
    return '#';
  }
  return link._id;
};
