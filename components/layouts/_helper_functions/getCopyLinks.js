export default (link) => {
  if (link && link._id && link.navigation.nav_title) {
    return link._id;
  }
  return '#';
};
