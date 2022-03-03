/* import { useFusionContext } from 'fusion:context';
import OHIO_SITES from '../../../components/layouts/_helper_functions/staffpage/OHIO_SITES';

const filterAuthorsBySite = (staffData) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  console.log('filterAuthorBySite - arcSite var', arcSite);
  console.log('filterAuthorBySite - staffData', staffData);
  const staffMembers = staffData?.q_results;
  const filteredStaff = staffMembers.map((author) => {
    if (author?.affiliations?.some(OHIO_SITES()[arcSite])) {
      return author;
    }
    return null;
  });

  return filteredStaff;
};

export default filterAuthorsBySite;
 */