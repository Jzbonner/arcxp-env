import contentAPIFilter from '../filters/content-api-filter';

const schemaName = 'article';
const ttl = 259200;

const params = {
  path: 'text',
  published: 'text',
  id: 'text',
};

const resolve = (query) => {
  const { 'arc-site': arcSite = 'ajc', path, id } = query;
  let requestUri = `/content/v4/?published=true&website=${arcSite}&included_fields=${contentAPIFilter}`;
  requestUri += path ? `&website_url=${path}` : '';
  requestUri += id ? `&_id=${id}` : '';
  return requestUri;
};

const transform = (json) => {
  const newJson = Object.assign({}, json);
  const contentElements = newJson?.content_elements;

  const newContentElements = [];
  let rowOfAlignedElements = [];

  // Moves consecutively aligned elements to a new content type
  contentElements.forEach((element, i) => {
    if (
      !element.alignment
      || (element.alignment
        && !element.type === 'text'
        && !element.type === 'image')
    ) {
      // The current element is not aligned, indicating the preceding group of aligned elements has ended.
      if (rowOfAlignedElements.length) {
        newContentElements.push({
          type: 'aligned_elements',
          items: rowOfAlignedElements,
        });
        rowOfAlignedElements = [];
      }
      newContentElements.push(element);
    } else if (element.alignment) {
      // The current element is aligned but
      //   1. it or the previous element is aligned center or
      //   2. it is aligned left while the previous one is aligned right
      // indicating it belongs in a new block of aligned elements.
      //
      // Separating rows of aligned elements into separate aligned_element elements
      // is important so that ads can be inserted between each row.
      if ((contentElements?.[i - 1]?.alignment === 'center' || element.alignment === 'center')
         || (contentElements?.[i - 1]?.alignment === 'right' && element.alignment === 'left')
      ) {
        newContentElements.push({
          type: 'aligned_elements',
          items: rowOfAlignedElements,
        });
        rowOfAlignedElements = [];
      }
      rowOfAlignedElements.push(element);
    }
  });

  newJson.content_elements = newContentElements;
  return newJson;
};

export default {
  ttl,
  resolve,
  params,
  schemaName,
  transform,
};
