/* /components/output-types/xml.js */

import xmlbuilder from 'xmlbuilder';

const Xml = ({ children }) => {
  // Only return the data from the first child.
  console.log('carlos children from output type', children);
  return xmlbuilder.create({
    service: children[0] || '',
  }, {
    separateArrayItems: true,
  }).end({
    pretty: true,
  });
};

// XML content type
Xml.contentType = 'application/xml';

export default Xml;
