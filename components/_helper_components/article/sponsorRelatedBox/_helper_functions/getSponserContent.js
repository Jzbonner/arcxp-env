import filterDuplicateStory from './filterDuplicateStory';

export default function getSponserContent(limit, queryFeed, siteData = {}, refId) {
  const { sponsor_url: sponsorUrl, sponsor_related_box_title: sponsorTitle } = siteData;
  if (!queryFeed || !queryFeed.content_elements || queryFeed.content_elements.length < 1) return null;
  const data = [];
  const filteredQueryFeed = filterDuplicateStory([...queryFeed.content_elements], refId);

  filteredQueryFeed.forEach((el, i) => {
    if (i < limit) {
      const temp = {};
      if (sponsorTitle && sponsorUrl && i === limit - 1) {
        temp.url = sponsorUrl || null;
        temp.headline = sponsorTitle || null;
      } else if (el.canonical_url && (el.headlines && el.headlines.basic)) {
        temp.url = el.canonical_url;
        temp.headline = el.headlines.basic;
        temp.id = el._id ? el._id : null;
      }

      if (temp.url && temp.headline) return data.push(temp);
    }

    return null;
  });

  return data;
}
