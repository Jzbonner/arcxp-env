const contributorArray = (expertise) => {
  // Replace any alphabetic characters //
  const onlyNums = expertise.replace(/[a-zA-z]/g, '');
  let expertiseArr = onlyNums.split(',');

  // loop through and remove empty spaces //
  for (let i = 0; i < expertiseArr.length; i += 1) {
    expertiseArr[i] = expertiseArr[i].replace(/^\s*/, '').replace(/\s*$/, '');
    if (expertiseArr[i] === '17') {
      expertiseArr[i] = 'community contributor';
    }
    if (expertiseArr[i] === '18') {
      expertiseArr[i] = 'alpharetta';
    }
    if (expertiseArr[i] === '19') {
      expertiseArr[i] = 'dunwoody';
    }
    if (expertiseArr[i] === '20') {
      expertiseArr[i] = 'roswell';
    }
    if (expertiseArr[i] === '21') {
      expertiseArr[i] = 'sandy springs';
    }
  }

  // filters out everything unless it is a hyperlocal value //
  expertiseArr = expertiseArr.filter(el => el === 'community contributor'
  || el === 'alpharetta'
  || el === 'dunwoody'
  || el === 'roswell'
  || el === 'sandy springs');

  return expertiseArr;
};

export default contributorArray;
