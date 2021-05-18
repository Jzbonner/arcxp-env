/* /components/output-types/xml.js */
import Api from '../features/api/rss';
import buildXML from './_helper_components/buildXML';

const Xml = (props) => {
  const {
    siteProperties,
    globalContentConfig,
    arcSite,
  } = props || {};

  const rssApi = new Api(props);
  const rssApiContent = rssApi.render();

  const { orgName } = siteProperties || {};
  const { query } = globalContentConfig || {};
  const { id: collectionId } = query || {};
  const feedLink = collectionId ? `/list/${collectionId}` : '';

  const xmlOptions = {
    header: true,
    indent: '  ',
  };

  return buildXML('rss-newsletter', rssApiContent, { arcSite, feedLink, orgName }, xmlOptions);
};

// XML content type
Xml.contentType = 'application/xml';

export default Xml;
