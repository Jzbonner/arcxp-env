export default (layout, cdnSite, arcSite) => (layout.indexOf('wrap-') !== -1 ? `https://www.${cdnSite || arcSite}.com` : '');
