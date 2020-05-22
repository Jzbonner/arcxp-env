export default function getSponserContent(limit, queryFeed, siteData = {}) {
  const { sponsor_url: sponsorUrl, sponsor_related_box_title: sponsorTitle } = siteData;
  if (!queryFeed) return null;
  const data = [];

  queryFeed.content_elements.forEach((el, i) => {
    if (i < limit) {
      const temp = {};
      if (sponsorTitle && sponsorUrl && i === limit - 1) {
        temp.url = sponsorUrl || null;
        temp.headline = sponsorTitle || null;
      } else if (el.canonical_url && (el.headlines && el.headlines.basic)) {
        temp.url = el.canonical_url;
        temp.headline = el.headlines.basic;
      }

      if (temp.url && temp.headline) return data.push(temp);
    }

    return null;
  });
  console.log('data', data);
  return data;
}
