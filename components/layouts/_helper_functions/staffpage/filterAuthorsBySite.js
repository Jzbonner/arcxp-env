import OHIO_SITES from './OHIO_SITES';

const filterAuthorsBySite = (staffData, arcSite) => {
  const staffMembers = staffData?.q_results;
  const ohioSiteID = OHIO_SITES()[arcSite];
  const filteredStaff = staffMembers.map((author) => {
    if (author?.affiliations?.includes(ohioSiteID)) {
      return author;
    }
    return null;
  });

  return filteredStaff;
};

export default filterAuthorsBySite;
