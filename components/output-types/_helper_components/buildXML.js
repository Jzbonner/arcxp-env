import { toXML } from 'jstoxml';
import { formatApiTime } from '../../layouts/_helper_functions/api/formatTime';

export default function buildXML(rssTitle = 'rss', rssApiContent, { websiteURL = '', feedLink = '', orgName = '' }, xmlOptions = {}) {
  return toXML({
    _name: `${rssTitle}`,
    _attrs: {
      'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
      'xmlns:media': 'http://search.yahoo.com/mrss/',
      'xmlns:atom': 'http://www.w3.org/2005/Atom',
      version: '2.0',
    },
    _content: {
      channel: [
        {
          title: `${rssTitle.toUpperCase()} FEED`,
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
}
