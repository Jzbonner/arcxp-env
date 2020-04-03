const checkTags = (tags, searchFor) => {
  let match = false;
  if (typeof searchFor === 'string') {
    match = tags.some(tag => tag && tag.text && tag.text.toLowerCase() === searchFor);
  } else {
    match = tags.some(tag => tag && tag.text && searchFor.includes(tag.text.toLowerCase()));
  }
  return match;
};

export default checkTags;
