export default function getVideoAuthor(basic) {
  const by = (basic && basic.credits && basic.credits.by && basic.credits.by[0]) || null;
  let videoAuthor = '';

  if (by) {
    if (by.name) videoAuthor = by.name;
    if (!videoAuthor && by.org) videoAuthor = by.org;
  }

  return videoAuthor;
}
