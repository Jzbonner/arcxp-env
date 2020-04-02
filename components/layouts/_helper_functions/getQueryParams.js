const getQueryParams = (url) => {
  const queryParams = {};
  const splitAtQuestionMark = url.split('?');

  if (splitAtQuestionMark.length === 2) {
    const params = splitAtQuestionMark[1].split('&');
    params.forEach((param) => {
      const pair = param.split('=');
      if (pair.length === 2) {
        queryParams[pair[0]] = decodeURIComponent(pair[1]);
      }
    });
  }

  return queryParams;
};

export default getQueryParams;
