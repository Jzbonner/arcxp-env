import AREAS_OF_EXPERTISE from './AREAS_OF_EXPERTISE';

const findArea = (selectedAreaTag = '', site = '') => {
  if (AREAS_OF_EXPERTISE()[site] && AREAS_OF_EXPERTISE()[site].all && AREAS_OF_EXPERTISE()[site].all.tag === selectedAreaTag) {
    return AREAS_OF_EXPERTISE()[site].all;
  }
  if (AREAS_OF_EXPERTISE()[site] && AREAS_OF_EXPERTISE()[site].newsroom && AREAS_OF_EXPERTISE()[site].newsroom.tag === selectedAreaTag) {
    return AREAS_OF_EXPERTISE()[site].newsroom;
  }
  if (AREAS_OF_EXPERTISE()[site] && AREAS_OF_EXPERTISE()[site].areas) {
    return AREAS_OF_EXPERTISE()[site].areas.filter(area => area.tag === selectedAreaTag)[0];
  }
  return null;
};

export default findArea;
