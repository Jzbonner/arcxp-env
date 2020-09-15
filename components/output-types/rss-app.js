/* /components/output-types/xml.js */
import { toXML } from 'jstoxml';
import Api from '../features/api/rss';
import { formatApiTime } from '../layouts/_helper_functions/api/formatTime';

const Xml = (props) => {
  const {
    siteProperties,
    globalContentConfig,
  } = props || {};

  const rssApi = new Api(props);
  const rssApiContent = rssApi.render();

  const { orgName, websiteURL } = siteProperties || {};
  const { query } = globalContentConfig || {};
  const { id: collectionId } = query || {};
  const feedLink = collectionId ? `/list/${collectionId}` : '';

  const xmlOptions = {
    header: true,
    indent: '  ',
  };

  return toXML({
    _name: 'rss-app',
    _attrs: {
      'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
      'xmlns:media': 'http://search.yahoo.com/mrss/',
      'xmlns:atom': 'http://www.w3.org/2005/Atom',
      version: '2.0',
    },
    _content: {
      channel: [
        {
          title: 'RSS-APP FEED',
        },
        {
          link: `${websiteURL}${feedLink}`,
        },
        {
          description: `${orgName}`,
        },
        {
          language: 'en-us',
        },
        {
          _name: 'atom:link',
          _attrs: {
            href: `${websiteURL}${feedLink}`,
            rel: 'self',
          },
        },
        {
          lastBuildDate: () => formatApiTime(),
        },
        rssApiContent,
      ],
    },
  }, xmlOptions);
};

// XML content type
Xml.contentType = 'application/xml';

export default Xml;
