import getContentMeta from '../../_helper_components/global/siteMeta/_helper_functions/getContentMeta';

const checkTags = (tags, searchFor, extra) => {
  const contentMeta = getContentMeta() || {};
  const { topics = [] } = contentMeta;
  /* console.log('contentMeta topics', topics); */
  console.log('extra data', extra);
  console.log('noAmp ppp', searchFor);
  let match = false;
  // console.log('tags', tags);
  if (searchFor === 'no-amp') {
    console.log('noAmp ppp', searchFor);
  }
  if (typeof searchFor === 'string') {
    match = tags.some(tag => tag && tag.text && tag.text.toLowerCase() === searchFor.toLowerCase());
  } else if (Array.isArray(searchFor)) {
    // returns the truthy value of the first hyperlocal tag or undefined
    match = tags.find(tag => tag && tag.text && searchFor.includes(tag.text.toLowerCase()));
    if (match) {
      match = match.text.toLowerCase();
    }
  }
  return match;
};

export default checkTags;
