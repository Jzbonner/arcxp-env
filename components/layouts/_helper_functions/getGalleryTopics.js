const getGalleryTopics = (promoItems = {}, taxonomy = {}) => {
  const { basic = {} } = promoItems || {};
  const { additional_properties: additionalProperties = {} } = basic;
  const { keywords = [] } = additionalProperties;

  const { tags = [] } = taxonomy;

  const finalTaxonomyTags = [];
  if (tags.length) {
    tags.forEach(tag => (tag?.name ? finalTaxonomyTags.push(tag.name) : tag?.text && finalTaxonomyTags.push(tag.text)));
  }

  return [...new Set([...finalTaxonomyTags, ...keywords])];
};

export default getGalleryTopics;
