export default function getVideoAuthor(basic) {
  const { source, owner } = basic;
  const by = (basic && basic.credits && basic.credits.by && basic.credits.by[0]) || null;
  const videoAuthor = (source && source.name) || (owner && owner.name) || (by && by.name) || (by && by.org) || '';

  return videoAuthor;
}
