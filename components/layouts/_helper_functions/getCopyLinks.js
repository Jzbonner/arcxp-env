export default (link) => {
  if (link && link.site && link.site.site_url) {
    return link.site.site_url;
  }
  if (link && link._id) {
    return link._id;
  }
  return '#';
};
