const checkTags = (tags, searchFor) => {
  let match = false;
  if (typeof searchFor === 'string') {
    match = tags.some(tag => tag && tag.text && tag.text.toLowerCase() === searchFor.toLowerCase());

    // APD-1673: Another check in case tag elemets do not have a text property
    if (!match) {
      match = tags.some(tag => tag && tag === searchFor);
    }
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
