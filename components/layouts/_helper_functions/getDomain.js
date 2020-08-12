import handleSiteName from './handleSiteName';

export default (layout, cdnSite, arcSite) => (layout.indexOf('wrap-') !== -1 ? `https://www.
${handleSiteName(cdnSite) || handleSiteName(arcSite)}.com` : '');
