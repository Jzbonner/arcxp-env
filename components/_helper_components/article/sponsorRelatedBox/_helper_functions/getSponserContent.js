export default function getSponserContent(limit, queryFeed, siteData = {}) {
  const { sponsor_url: sponsorUrl, sponsor_related_box_title: sponsorTitle } = siteData;
  console.log('func site data', siteData);
  const data = queryFeed.content_elements.map((el, i) => {
    if (i <= limit) {
      const temp = {};
      if (sponsorTitle && sponsorUrl && i === limit) {
        temp.url = sponsorUrl || null;
        temp.headline = sponsorTitle || null;
      } else {
        temp.url = el.canonical_url ? el.canonical_url : null;
        temp.headline = el.headlines && el.headlines.basic ? el.headlines.basic : null;
      }

      return temp;
    }

    return null;
  });

  return data;
}
