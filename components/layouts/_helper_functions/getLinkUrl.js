export default (link) => {
  if (link && link._id && link._id.includes('configsection') && link.site.site_url) {
    // not sure about best default behavior if no site url is set for a configsection
    return link.site.site_url;
  }
  return link._id;
};
