import { toXML } from 'jstoxml';
import { formatApiTime } from '../../layouts/_helper_functions/api/formatTime';
import fetchEnv from '../../_helper_components/global/utils/environment';
import handleSiteName from '../../layouts/_helper_functions/handleSiteName';

export default function buildXML(rssTitle = 'rss', rssApiContent, { arcSite = '', feedLink = '', orgName = '' }, xmlOptions = {}) {
  const siteDomain = `${fetchEnv() === 'prod' ? 'www' : 'sandbox'}.${handleSiteName(arcSite)}.com`;

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
          title: `${rssTitle.toUpperCase()} FEED`,
        },
        {
          link: `https://${siteDomain}${feedLink}`,
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
            href: `https://${siteDomain}${feedLink}`,
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
