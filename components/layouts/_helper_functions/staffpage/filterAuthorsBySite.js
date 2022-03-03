import OHIO_SITES from './OHIO_SITES';

const filterAuthorsBySite = (staffData, arcSite) => {
  console.log('filterAuthorBySite - arcSite var', arcSite);
  console.log('filterAuthorBySite - staffData', staffData);
  const staffMembers = staffData?.q_results;
  const ohioSiteID = OHIO_SITES()[arcSite];
  console.log('ohioSite', ohioSiteID);
  const filteredStaff = staffMembers.map((author, i) => {
    console.log(author, i);
   // if (author && !author.affiliations) return null;
    if (author?.affiliations?.includes(ohioSiteID)) {
      return author;
    }
    return null;
  });

  return filteredStaff;
};

export default filterAuthorsBySite;
