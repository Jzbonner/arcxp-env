export default (alt, caption) => {
  if (alt && alt !== '') {
    return alt;
  }
  if (caption && caption.length > 1) {
    return caption;
  }
  return 'ajc.com';
};
