const getGalleryTopics = (promoItems = {}, taxonomy = {}) => {
  const { basic = {} } = promoItems || {};
  const { additional_properties: additionalProperties = {} } = basic;
  const { keywords = [] } = additionalProperties;

  const { tags = [] } = taxonomy;

  const finalTaxonomyTags = tags.map(tag => (tag && tag.name ? tag.name : tag.text));

  return [...new Set([...finalTaxonomyTags, ...keywords])];
};

export default getGalleryTopics;
