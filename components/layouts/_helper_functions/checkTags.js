const checkTags = (tags, searchFor) => {
  let match = false;
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
