export const getGalleryImageTopics = (contentElements = []) => {
  let jointArray = [];

  contentElements.forEach((el) => {
    const { additional_properties: additionalProperties } = el || {};
    const { keywords = [] } = additionalProperties || {};
    jointArray = [...jointArray, ...keywords];
  });

  return [...new Set([...jointArray])];
};

export default getGalleryImageTopics;
