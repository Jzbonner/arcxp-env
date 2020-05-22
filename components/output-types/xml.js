/* /components/output-types/xml.js */

import { toXML } from 'jstoxml';

const Xml = ({ children }) => {
  const xmlOptions = {
    header: true,
    indent: '  ',
  };

  return toXML({
    _name: 'rss',
    _attrs: {
      'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
      'xmlns:media': 'http://search.yahoo.com/mrss/',
      'xmlns:atom': 'http://www.w3.org/2005/Atom',
      version: '2.0',
    },
    _content: {
      channel: [
        {
          title: 'RSS FEED',
        },
        {
          'atom:link': 'We need to get the link here',
        },
        {
          description: 'Description',
        },
        {
          language: 'en-us',
        },

        {
          item: [{
            title: 'Item title',
            link: 'Item link',
            description: 'Item Description',
            pubDate: () => new Date(),
          }] || children[0],
        },
      ],
    },
  }, xmlOptions);
};

// XML content type
Xml.contentType = 'application/xml';

export default Xml;
