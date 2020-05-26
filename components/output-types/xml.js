/* /components/output-types/xml.js */
import { toXML } from 'jstoxml';

const Xml = ({ children }) => {
  const xmlOptions = {
    header: true,
    indent: '  ',
  };

  // how am I going to fetch the feed here?
  // The examples have the feed id tied to the feature? maybe a resolver?
  // I need the description, link, and last build date.

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
          link: `${'need to get website url'}/common/feeds/${'need_to_get_id_here?'}`,
        },
        {
          description: 'Description',
        },
        {
          language: 'en-us',
        },
        {
          _name: 'atom:link',
          _attrs: {
            href: `${'need to get website url'}/common/feeds/${'need_to_get_id_here?'}`,
            rel: 'self',
          },
        },
        {
          lastBuildDate: () => new Date(),
        },
        Array.isArray(children) ? children[0] : [],
      ],
    },
  }, xmlOptions);
};

// XML content type
Xml.contentType = 'application/xml';

export default Xml;
